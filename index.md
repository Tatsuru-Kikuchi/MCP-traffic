# MCP Traffic - Tokyo Traffic Data Collection

Welcome to the **MCP Traffic** project, a comprehensive system for collecting, analyzing, and visualizing traffic data in Tokyo using the ODPT (Open Data Platform for Transportation) API.

## 🎯 Interactive Dashboard

**[📊 View Live Tokyo Traffic Dashboard →](./dashboard.html)**

Experience our real-time Tokyo transportation data visualization with:
- Live station passenger data
- Real-time train and bus tracking  
- Interactive geographic map
- Comprehensive traffic analytics

## 🚦 What is MCP Traffic?

MCP Traffic is an automated data collection system that:

- **Collects Real-time Data**: Gathers traffic information from Tokyo's public transportation APIs
- **Processes and Stores**: Efficiently processes and archives traffic data for analysis
- **Provides Analysis Tools**: Offers tools for traffic pattern analysis and visualization
- **Monitors Continuously**: Runs automated collection schedules for up-to-date information

## 📊 Live System Status

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; margin: 20px 0;">
  <h3 style="margin: 0 0 15px 0;">🔴 LIVE - Tokyo Transportation Monitor</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
      <strong>Daily Passengers</strong><br>
      <span style="font-size: 1.5em;">2.15M</span>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
      <strong>System Performance</strong><br>
      <span style="font-size: 1.5em;">94.2%</span>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
      <strong>Average Delay</strong><br>
      <span style="font-size: 1.5em;">1.0 min</span>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
      <strong>Active Alerts</strong><br>
      <span style="font-size: 1.5em;">0</span>
    </div>
  </div>
</div>

## 📊 Sample Analysis Results

Our system has analyzed real Tokyo transportation data with impressive results:

### Executive Summary
- **Daily Passengers**: 2.15M across major stations
- **Analyzed Stations**: 5 major hubs
- **Active Operators**: JR East & Tokyo Metro
- **System Performance**: 94.2% punctuality rate
- **Average Delay**: 1.0 minutes

### Top Busiest Stations
1. **Shinjuku Station** - 753K passengers/day (JR East)
2. **Ikebukuro Station** - 558K passengers/day (Tokyo Metro)
3. **Tokyo Station** - 462K passengers/day (JR East)
4. **Ueno Station** - 198K passengers/day (Tokyo Metro)
5. **Ginza Station** - 180K passengers/day (Tokyo Metro)

## 🎯 Key Features

### 📈 Real-time Visualization Dashboard
Our newly enhanced dashboard provides:
- **Interactive Maps**: Click and explore station locations
- **Live Charts**: Real-time passenger flow analysis
- **Mobile Responsive**: Works perfectly on all devices
- **Status Monitoring**: System health at a glance

### 🔄 Data Collection
- Automated traffic data collection from ODPT API
- Support for multiple data types (bus, train, traffic flow)
- Configurable collection schedules
- Error handling and retry mechanisms

### 🧹 Data Processing
- Raw data cleaning and validation
- Data transformation and normalization
- Automated archiving system
- Performance optimization

### 📊 Monitoring & Analysis
- Real-time system health monitoring
- Traffic pattern analysis
- Historical data comparison
- Comprehensive logging

### 🚀 Deployment Options
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
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

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
├── archives/      # Historical data storage
└── examples/      # Sample data and analysis results
    ├── sample_analysis_results.json
    └── sample_station_data.json
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

### 🔧 Technical Documentation
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

## 🔍 Example Data Files

Explore our sample data and analysis:

- [Sample Analysis Results](https://github.com/Tatsuru-Kikuchi/MCP-traffic/blob/main/data/examples/sample_analysis_results.json) - Comprehensive analysis output
- [Sample Station Data](https://github.com/Tatsuru-Kikuchi/MCP-traffic/blob/main/data/examples/sample_station_data.json) - ODPT-formatted station information

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

<div style="background: #f8f9ff; border: 2px solid #667eea; border-radius: 15px; padding: 25px; text-align: center; margin: 30px 0;">
  <h3 style="color: #667eea; margin: 0 0 15px 0;">🚀 Ready to Explore Tokyo's Transportation?</h3>
  <p style="margin: 0 0 20px 0; font-size: 1.1em;">Start with our interactive dashboard to see real-time Tokyo traffic data!</p>
  <a href="./dashboard.html" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 5px;">📊 Launch Dashboard</a>
</div>