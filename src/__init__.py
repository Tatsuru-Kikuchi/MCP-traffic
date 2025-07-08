"""
MCP Traffic Source Package

Tokyo Traffic Data Collection System using ODPT API
"""

__version__ = "1.0.0"
__author__ = "Tatsuru Kikuchi"
__email__ = "contact@mcp-traffic.example.com"
__description__ = "Tokyo traffic data collection and analysis system"

# Import main classes for convenience
from .collectors.traffic_collector import TrafficCollector
from .utils.config import ConfigManager
from .utils.api_client import ODPTClient

__all__ = [
    "TrafficCollector",
    "ConfigManager", 
    "ODPTClient"
]
