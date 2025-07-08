---
layout: default
title: Dashboard Help
---

# Tokyo Traffic Dashboard - User Guide

Welcome to the Tokyo Traffic Dashboard! This guide will help you understand and navigate all the features available in our real-time transportation monitoring system.

## 🚀 Getting Started

The dashboard is designed to be intuitive and user-friendly. Simply visit the [main dashboard](./dashboard.html) to start exploring Tokyo's transportation data in real-time.

## 📊 Dashboard Features

### Real-time Status Bar
At the top of the dashboard, you'll find:
- **Live Data Stream**: Green pulsing dot indicates active data collection
- **Current Time**: Shows Japan Standard Time (JST)
- **API Status**: Confirms connection to ODPT API

### Key Metrics Cards
Four main metric cards provide instant insights:

1. **Daily Passengers** - Total passenger count across monitored stations
2. **System Performance** - Overall punctuality percentage
3. **Average Delay** - System-wide delay in minutes
4. **Active Alerts** - Number of current service disruptions

### Station Rankings
The **Busiest Stations** card shows:
- Rank badges (1-5) for easy identification
- Station names in both English and Japanese
- Operator and railway line information
- Daily passenger counts with easy-to-read formatting

### Interactive Charts

#### Operator Distribution (Doughnut Chart)
- Visual breakdown of passenger distribution between operators
- Hover over segments for detailed information
- Color-coded for JR-East (blue) and Tokyo Metro (purple)

#### Passenger Flow Analysis (Bar Chart)
- Comparative view of passenger volumes by station
- Interactive tooltips with exact passenger counts
- Responsive design adapts to screen size

### Geographic Visualization
The **Tokyo Station Network** map features:
- Interactive map powered by OpenStreetMap
- Clickable station markers with detailed popup information
- Station coordinates and passenger data
- Zoom and pan functionality for detailed exploration

### Real-time Vehicle Tracking

#### Active Trains Section
- Real-time train positions and status
- Train numbers and operating companies
- Next station information
- Delay status with color-coded badges:
  - Green: On Time
  - Orange: Delayed

#### Active Buses Section
- Current bus locations and routes
- Route information and next stops
- Real-time delay tracking
- Operator identification

### Performance Metrics Grid
Comprehensive system performance indicators:
- **Service Availability**: Overall system uptime percentage
- **On-Time Services**: Percentage of punctual services
- **Delayed Services**: Count of services running behind schedule
- **Cancelled Services**: Number of cancelled operations

## 🔄 Interactive Features

### Refresh Data Button
- Click the "Refresh Data" button to update all metrics
- Animated refresh icon provides visual feedback
- Automatic notification confirms successful data update
- Simulates real-time data variations

### Responsive Design
The dashboard automatically adapts to different screen sizes:
- **Desktop**: Full grid layout with all features visible
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Single-column layout for easy navigation

### Hover Effects
- Cards lift slightly when hovered for better interactivity
- Smooth transitions enhance user experience
- Visual feedback for all interactive elements

## 📱 Mobile Experience

The dashboard is fully optimized for mobile devices:
- Touch-friendly interface elements
- Readable text and appropriately sized buttons
- Swipe-friendly map interactions
- Condensed layout without losing functionality

## 🎨 Visual Design Elements

### Color Scheme
- **Primary Blue**: #667eea (main branding color)
- **Purple Accent**: #764ba2 (secondary elements)
- **Success Green**: #4CAF50 (positive status indicators)
- **Warning Orange**: #ff9800 (delay/caution indicators)
- **Error Red**: #f44336 (critical alerts)

### Typography
- Clean, modern font stack: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Hierarchical text sizing for clear information architecture
- High contrast for accessibility

### Animations
- Smooth transitions on hover and interaction
- Pulsing live data indicator
- Spinning refresh animation
- Slide-in notifications

## 🔧 Technical Features

### Data Sources
- **ODPT API**: Primary data source for real-time transportation information
- **Sample Data**: Demonstrates system capabilities with realistic Tokyo transportation data
- **Real-time Simulation**: Updates metrics to simulate live data streams

### Performance Optimization
- Efficient chart rendering with Chart.js
- Lightweight map implementation with Leaflet
- Optimized CSS with modern features like backdrop-filter
- Responsive images and assets

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 📊 Understanding the Data

### Station Data
- **Daily Passengers**: Estimated daily ridership
- **Operators**: JR-East and Tokyo Metro networks
- **Geographic Coverage**: Central Tokyo metropolitan area
- **Update Frequency**: 30-second intervals (simulated)

### Performance Metrics
- **Punctuality**: Percentage of services arriving on time
- **Average Delay**: Mean delay across all monitored services
- **Service Availability**: System uptime and operational status

### Real-time Elements
- **Live Clock**: Updates every second with JST time
- **Dynamic Metrics**: Simulated real-time data variations
- **Status Indicators**: Color-coded system health indicators

## 🆘 Troubleshooting

### Common Issues

**Dashboard not loading properly:**
- Check internet connection
- Ensure JavaScript is enabled
- Try refreshing the page
- Clear browser cache

**Charts not displaying:**
- Verify Chart.js library is loading
- Check for JavaScript errors in browser console
- Ensure browser supports Canvas API

**Map not showing:**
- Confirm Leaflet library is accessible
- Check for network connectivity issues
- Verify OpenStreetMap tiles are loading

**Mobile display issues:**
- Ensure viewport meta tag is present
- Check CSS media queries
- Verify touch interactions work properly

### Performance Tips
- Use modern browsers for best experience
- Ensure stable internet connection for real-time updates
- Close unnecessary browser tabs for optimal performance
- Enable hardware acceleration in browser settings

## 🔮 Future Enhancements

Planned improvements include:
- Real-time data integration with actual ODPT API
- Historical data analysis and trends
- Predictive delay modeling
- Multi-language support (Japanese, English)
- Advanced filtering and search capabilities
- Export functionality for reports
- Customizable dashboard layouts
- Push notifications for service alerts

## 💡 Tips for Best Experience

1. **Use landscape orientation** on tablets and phones for optimal layout
2. **Click on map markers** for detailed station information
3. **Hover over charts** for interactive data points
4. **Use the refresh button** to see simulated real-time updates
5. **Bookmark the dashboard** for quick access to Tokyo traffic data

## 📞 Support

For technical support or feature requests:
- Create an issue on the [GitHub repository](https://github.com/Tatsuru-Kikuchi/MCP-traffic)
- Check the [troubleshooting documentation](docs/troubleshooting.md)
- Review the [API documentation](docs/api.md) for technical details

---

**Ready to explore Tokyo's transportation system? [Launch the Dashboard](./dashboard.html)**