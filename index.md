---
layout: home
title: Home
---

# MCP Traffic - Tokyo Traffic Data Collection

Welcome to the **MCP Traffic** project, a comprehensive system for collecting, analyzing, and visualizing traffic data in Tokyo using the ODPT (Open Data Platform for Transportation) API.

## 🚦 What is MCP Traffic?

MCP Traffic is an automated data collection system that:

- **Collects Real-time Data**: Gathers traffic information from Tokyo's public transportation APIs
- **Processes and Stores**: Efficiently processes and archives traffic data for analysis
- **Provides Analysis Tools**: Offers tools for traffic pattern analysis and visualization
- **Monitors Continuously**: Runs automated collection schedules for up-to-date information

## 🎯 Key Features

### Data Collection
- Automated traffic data collection from ODPT API
- Support for multiple data types (bus, train, traffic flow)
- Configurable collection schedules
- Error handling and retry mechanisms

### Data Processing
- Raw data cleaning and validation
- Data transformation and normalization
- Automated archiving system
- Performance optimization

### Monitoring & Analysis
- Real-time system health monitoring
- Traffic pattern analysis
- Historical data comparison
- Comprehensive logging

### Deployment Options
- Local development setup
- Server deployment with systemd
- Docker containerization
- Cloud deployment (AWS, GCP, Azure)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Git
- ODPT API access (key included in repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/Tatsuru-Kikuchi/MCP-traffic.git
cd MCP-traffic

# Set up Python environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure the system
cp config/api_config.example.json config/api_config.json
# Edit config/api_config.json with your settings

# Test the installation
python src/collectors/traffic_collector.py --catalog-only
```

### Running Data Collection

```bash
# Run a single collection
python scripts/collect_all_data.py

# Start scheduled collection
python scripts/schedule_collection.py
```

## 📊 Data Structure

The system organizes data in a structured hierarchy:

```
data/
├── raw/           # Original API responses
├── processed/     # Cleaned and transformed data
└── archives/      # Historical data storage
```

## 🛠️ System Architecture

### Core Components

1. **Data Collectors** (`src/collectors/`)
   - Traffic data collection modules
   - API interface handlers
   - Error handling and retries

2. **Data Processors** (`src/processors/`)
   - Data cleaning and validation
   - Format conversion utilities
   - Archive management

3. **Monitoring System** (`monitoring/`)
   - Health checks
   - Performance monitoring
   - Alert management

4. **Configuration** (`config/`)
   - API configuration
   - System settings
   - Deployment parameters

### Workflow

1. **Collection**: Automated scripts fetch data from ODPT API
2. **Processing**: Raw data is cleaned and transformed
3. **Storage**: Processed data is stored in organized directories
4. **Monitoring**: System health and data quality are continuously monitored
5. **Analysis**: Tools analyze traffic patterns and trends

## 📈 Monitoring & Health Checks

The system includes comprehensive monitoring:

- **API Connectivity**: Monitors ODPT API availability
- **Disk Space**: Tracks storage usage and alerts on low space
- **Data Freshness**: Ensures recent data collection
- **System Performance**: Monitors resource usage

### Health Check
```bash
python monitoring/health_check.py
```

## 🐳 Docker Deployment

Quick deployment with Docker:

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f mcp-traffic
```

## ☁️ Cloud Deployment

Supported cloud platforms:

- **AWS**: EC2 instances with S3 storage
- **Google Cloud**: Compute Engine with Cloud Storage
- **Azure**: Virtual Machines with Blob Storage

See the [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Comprehensive deployment instructions
- [API Documentation](docs/api.md) - API reference and examples
- [Configuration Guide](docs/configuration.md) - System configuration options
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

## 🔧 Configuration

Key configuration files:

- `config/api_config.json` - API settings and credentials
- `_config.yml` - Jekyll site configuration
- `docker-compose.yml` - Docker deployment settings

## 📝 Logging

Logs are stored in the `logs/` directory:

- `application.log` - Main application logs
- `data_collection.log` - Data collection activities
- `health_check.log` - System health status
- `error.log` - Error messages and exceptions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the [documentation](docs/)
- Review the [troubleshooting guide](docs/troubleshooting.md)

## 🏆 Acknowledgments

- **ODPT (Open Data Platform for Transportation)** for providing the traffic data API
- **Tokyo Metropolitan Government** for open data initiatives
- **Jekyll** and **GitHub Pages** for documentation hosting

---

**Ready to start monitoring Tokyo traffic? Follow the [Quick Start](#-quick-start) guide above!**
