#!/usr/bin/env python3
"""
MCP Traffic - Health Check Script

This script monitors the health of the traffic data collection system
"""

import sys
import os
import json
import time
import shutil
from datetime import datetime, timedelta
from pathlib import Path

# Add src directory to path
sys.path.append(str(Path(__file__).parent.parent / "src"))

from utils.config import ConfigManager
from utils.api_client import ODPTClient
from utils.logger import setup_logger


class HealthChecker:
    """System health checker for MCP Traffic"""
    
    def __init__(self, config_path: str = "config/api_config.json"):
        """Initialize health checker
        
        Args:
            config_path: Path to configuration file
        """
        self.config_manager = ConfigManager(config_path)
        self.config = self.config_manager.get_config()
        self.logger = setup_logger(__name__)
        self.api_client = ODPTClient(self.config)
        
    def check_api_connectivity(self) -> dict:
        """Check ODPT API connectivity
        
        Returns:
            Dict with connectivity status
        """
        self.logger.info("Checking API connectivity...")
        
        try:
            health_status = self.api_client.get_health_status()
            return {
                "status": "healthy" if health_status["api_accessible"] else "unhealthy",
                "details": health_status
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "details": {"error": str(e)}
            }
            
    def check_disk_space(self) -> dict:
        """Check available disk space
        
        Returns:
            Dict with disk space status
        """
        self.logger.info("Checking disk space...")
        
        try:
            # Check current directory disk usage
            total, used, free = shutil.disk_usage('.')
            
            total_gb = total / (1024**3)
            used_gb = used / (1024**3)
            free_gb = free / (1024**3)
            free_percent = (free / total) * 100
            
            # Check data directory sizes
            data_dir = Path("data")
            data_size_mb = 0
            
            if data_dir.exists():
                for file_path in data_dir.rglob("*"):
                    if file_path.is_file():
                        data_size_mb += file_path.stat().st_size / (1024**2)
            
            status = "healthy"
            if free_percent < 10:
                status = "critical"
            elif free_percent < 20:
                status = "warning"
                
            return {
                "status": status,
                "details": {
                    "total_gb": round(total_gb, 2),
                    "used_gb": round(used_gb, 2),
                    "free_gb": round(free_gb, 2),
                    "free_percent": round(free_percent, 2),
                    "data_directory_mb": round(data_size_mb, 2)
                }
            }
            
        except Exception as e:
            return {
                "status": "error",
                "details": {"error": str(e)}
            }
            
    def check_recent_data(self) -> dict:
        """Check if data was collected recently
        
        Returns:
            Dict with recent data status
        """
        self.logger.info("Checking recent data collection...")
        
        try:
            data_dir = Path("data/raw")
            if not data_dir.exists():
                return {
                    "status": "warning",
                    "details": {"message": "Data directory does not exist"}
                }
                
            # Find most recent data file
            json_files = list(data_dir.glob("*.json"))
            if not json_files:
                return {
                    "status": "warning", 
                    "details": {"message": "No data files found"}
                }
                
            latest_file = max(json_files, key=lambda f: f.stat().st_mtime)
            latest_time = datetime.fromtimestamp(latest_file.stat().st_mtime)
            time_since_last = datetime.now() - latest_time
            
            # Consider data stale if older than 2 hours
            status = "healthy"
            if time_since_last > timedelta(hours=6):
                status = "critical"
            elif time_since_last > timedelta(hours=2):
                status = "warning"
                
            return {
                "status": status,
                "details": {
                    "latest_file": str(latest_file),
                    "latest_collection": latest_time.isoformat(),
                    "hours_since_last": round(time_since_last.total_seconds() / 3600, 2),
                    "file_size_mb": round(latest_file.stat().st_size / (1024**2), 2)
                }
            }
            
        except Exception as e:
            return {
                "status": "error",
                "details": {"error": str(e)}
            }
            
    def check_configuration(self) -> dict:
        """Check configuration validity
        
        Returns:
            Dict with configuration status
        """
        self.logger.info("Checking configuration...")
        
        try:
            # Check if API key is configured
            api_key = self.config_manager.get_api_key()
            
            status = "healthy"
            issues = []
            
            if api_key == "YOUR_API_KEY_HERE":
                status = "warning"
                issues.append("API key appears to be placeholder")
                
            # Check required directories
            required_dirs = ["data/raw", "data/processed", "data/archives", "logs"]
            for dir_path in required_dirs:
                if not Path(dir_path).exists():
                    issues.append(f"Missing directory: {dir_path}")
                    
            if issues and status == "healthy":
                status = "warning"
                
            return {
                "status": status,
                "details": {
                    "api_key_configured": api_key != "YOUR_API_KEY_HERE",
                    "issues": issues,
                    "config_file": str(self.config_manager.config_path)
                }
            }
            
        except Exception as e:
            return {
                "status": "error", 
                "details": {"error": str(e)}
            }
            
    def check_log_files(self) -> dict:
        """Check log file status
        
        Returns:
            Dict with log file status
        """
        self.logger.info("Checking log files...")
        
        try:
            from utils.logger import get_log_files_info
            log_info = get_log_files_info()
            
            if log_info["status"] == "no_logs_directory":
                return {
                    "status": "warning",
                    "details": {"message": "No logs directory found"}
                }
                
            # Check for excessively large log files
            status = "healthy"
            issues = []
            
            for log_file in log_info.get("files", []):
                if log_file["size_mb"] > 100:  # Log files over 100MB
                    issues.append(f"Large log file: {log_file['name']} ({log_file['size_mb']}MB)")
                    status = "warning"
                    
            return {
                "status": status,
                "details": {
                    "total_files": log_info.get("total_files", 0),
                    "total_size_mb": log_info.get("total_size_mb", 0),
                    "issues": issues
                }
            }
            
        except Exception as e:
            return {
                "status": "error",
                "details": {"error": str(e)}
            }
            
    def run_comprehensive_check(self) -> dict:
        """Run all health checks
        
        Returns:
            Complete health status report
        """
        self.logger.info("Running comprehensive health check...")
        
        checks = {
            "api_connectivity": self.check_api_connectivity(),
            "disk_space": self.check_disk_space(),
            "recent_data": self.check_recent_data(),
            "configuration": self.check_configuration(),
            "log_files": self.check_log_files()
        }
        
        # Determine overall status
        statuses = [check["status"] for check in checks.values()]
        
        if "error" in statuses or "critical" in statuses:
            overall_status = "critical"
        elif "unhealthy" in statuses:
            overall_status = "unhealthy"
        elif "warning" in statuses:
            overall_status = "warning"
        else:
            overall_status = "healthy"
            
        return {
            "timestamp": datetime.now().isoformat(),
            "overall_status": overall_status,
            "checks": checks,
            "summary": {
                "healthy": statuses.count("healthy"),
                "warning": statuses.count("warning"),
                "unhealthy": statuses.count("unhealthy"),
                "critical": statuses.count("critical"),
                "error": statuses.count("error")
            }
        }
        
    def save_health_report(self, report: dict, file_path: str = None):
        """Save health report to file
        
        Args:
            report: Health report dictionary
            file_path: Optional file path (defaults to logs/health_check.log)
        """
        if not file_path:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            file_path = f"logs/health_check_{timestamp}.json"
            
        # Create logs directory if it doesn't exist
        Path(file_path).parent.mkdir(parents=True, exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
            
        self.logger.info(f"Health report saved to {file_path}")


def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description="MCP Traffic - Health Check")
    parser.add_argument("--config", default="config/api_config.json",
                       help="Path to configuration file")
    parser.add_argument("--save-report", action="store_true",
                       help="Save health report to file")
    parser.add_argument("--check", choices=["api", "disk", "data", "config", "logs"],
                       help="Run specific check only")
    parser.add_argument("--format", choices=["json", "summary"], default="summary",
                       help="Output format")
    parser.add_argument("--verbose", "-v", action="store_true",
                       help="Enable verbose logging")
    
    args = parser.parse_args()
    
    try:
        # Check if config file exists
        config_path = Path(args.config)
        if not config_path.exists():
            print(f"Configuration file not found: {config_path}")
            print("Please copy config/api_config.example.json to config/api_config.json and configure it")
            return 1
            
        # Initialize health checker
        health_checker = HealthChecker(args.config)
        
        # Set verbose logging if requested
        if args.verbose:
            import logging
            logging.getLogger().setLevel(logging.DEBUG)
            
        # Run specific check or comprehensive check
        if args.check:
            check_methods = {
                "api": health_checker.check_api_connectivity,
                "disk": health_checker.check_disk_space,
                "data": health_checker.check_recent_data,
                "config": health_checker.check_configuration,
                "logs": health_checker.check_log_files
            }
            
            result = check_methods[args.check]()
            
            if args.format == "json":
                print(json.dumps(result, indent=2))
            else:
                print(f"Check: {args.check}")
                print(f"Status: {result['status']}")
                print(f"Details: {json.dumps(result['details'], indent=2)}")
                
        else:
            # Run comprehensive check
            report = health_checker.run_comprehensive_check()
            
            if args.save_report:
                health_checker.save_health_report(report)
                
            if args.format == "json":
                print(json.dumps(report, indent=2))
            else:
                # Print summary
                print("=== MCP Traffic Health Check ===")
                print(f"Timestamp: {report['timestamp']}")
                print(f"Overall Status: {report['overall_status'].upper()}")
                print()
                
                # Print individual check results
                for check_name, check_result in report['checks'].items():
                    status_symbol = {
                        "healthy": "✅",
                        "warning": "⚠️",
                        "unhealthy": "❌", 
                        "critical": "🚨",
                        "error": "💥"
                    }.get(check_result['status'], "❓")
                    
                    print(f"{status_symbol} {check_name.replace('_', ' ').title()}: {check_result['status'].upper()}")
                    
                print()
                print("Summary:")
                for status, count in report['summary'].items():
                    if count > 0:
                        print(f"  {status.title()}: {count}")
                        
        # Return appropriate exit code
        if args.check:
            return 0 if result['status'] in ["healthy", "warning"] else 1
        else:
            return 0 if report['overall_status'] in ["healthy", "warning"] else 1
            
    except Exception as e:
        print(f"Health check failed: {str(e)}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
