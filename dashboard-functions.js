// Dashboard functionality for Tokyo Traffic Dashboard
let map = null, passengerChart = null, operatorChart = null;
let analysisData = null, stationData = null;

// GitHub raw URLs for the data files
const ANALYSIS_DATA_URL = 'https://raw.githubusercontent.com/Tatsuru-Kikuchi/MCP-traffic/main/data/examples/sample_analysis_results.json';
const STATION_DATA_URL = 'https://raw.githubusercontent.com/Tatsuru-Kikuchi/MCP-traffic/main/data/examples/sample_station_data.json';

async function loadData() {
    try {
        console.log('Loading data from repository...');
        
        // Load analysis data
        const analysisResponse = await fetch(ANALYSIS_DATA_URL);
        if (!analysisResponse.ok) {
            throw new Error(`Failed to load analysis data: ${analysisResponse.status}`);
        }
        analysisData = await analysisResponse.json();
        
        // Load station data
        const stationResponse = await fetch(STATION_DATA_URL);
        if (!stationResponse.ok) {
            throw new Error(`Failed to load station data: ${stationResponse.status}`);
        }
        stationData = await stationResponse.json();
        
        console.log('Data loaded successfully:', { analysisData, stationData });
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

function initDashboard() {
    console.log('Initializing dashboard...');
    updateTime();
    setInterval(updateTime, 1000);
    
    // Load data and initialize components
    loadData().then(success => {
        if (success) {
            updateMetrics();
            populateStationList();
            createOperatorChart();
            createPassengerChart();
            initMap();
        } else {
            showError();
        }
    });
}

function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Tokyo'}) + ' JST';
    }
}

function updateMetrics() {
    if (!analysisData) return;
    
    const summary = analysisData.executive_summary;
    const performance = analysisData.real_time_analysis?.system_performance;
    
    document.getElementById('total-passengers').textContent = summary.total_daily_passengers.toLocaleString();
    document.getElementById('punctuality').textContent = performance ? performance.overall_punctuality + '%' : '94.2%';
    document.getElementById('avg-delay').textContent = performance ? performance.average_delay : '1.0';
    document.getElementById('active-alerts').textContent = performance ? performance.cancelled_services || 0 : '0';
}

function populateStationList() {
    if (!analysisData) return;
    
    const stationList = document.getElementById('station-list');
    if (!stationList) return;
    
    stationList.innerHTML = '';
    const stations = analysisData.station_analysis?.busiest_stations || [];
    
    stations.forEach(station => {
        const li = document.createElement('li');
        li.className = 'station-item';
        li.innerHTML = `
            <div class="rank-badge">${station.rank}</div>
            <div class="station-info">
                <div class="station-name">${station.name_en}</div>
                <div class="station-details">${station.operator} • ${station.railway} Line</div>
            </div>
            <div class="passenger-count">${station.daily_passengers.toLocaleString()}</div>
        `;
        stationList.appendChild(li);
    });
}

function showChartError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;${message}</div>`;
    }
}

function createOperatorChart() {
    try {
        if (!analysisData) {
            showChartError('operator-chart-container', 'No operator data available');
            return;
        }

        const container = document.getElementById('operator-chart-container');
        if (!container) return;

        const operatorBreakdown = analysisData.station_analysis?.operator_breakdown;
        if (!operatorBreakdown) {
            showChartError('operator-chart-container', 'Operator breakdown data not found');
            return;
        }

        // Create canvas element
        container.innerHTML = '<canvas id="operatorChart"></canvas>';
        const canvas = document.getElementById('operatorChart');
        const ctx = canvas.getContext('2d');

        const operators = Object.keys(operatorBreakdown);
        const data = operators.map(op => operatorBreakdown[op].total_passengers);
        const labels = operators.map(op => op === 'TokyoMetro' ? 'Tokyo Metro' : op);
        
        operatorChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return `${label}: ${value} passengers (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
        console.log('Operator chart created successfully');
    } catch (error) {
        console.error('Error creating operator chart:', error);
        showChartError('operator-chart-container', 'Failed to create operator chart');
    }
}

function createPassengerChart() {
    try {
        if (!analysisData) {
            showChartError('passenger-chart-container', 'No passenger data available');
            return;
        }

        const container = document.getElementById('passenger-chart-container');
        if (!container) return;

        const stations = analysisData.station_analysis?.busiest_stations;
        if (!stations || stations.length === 0) {
            showChartError('passenger-chart-container', 'Station data not found');
            return;
        }

        // Create canvas element
        container.innerHTML = '<canvas id="passengerChart"></canvas>';
        const canvas = document.getElementById('passengerChart');
        const ctx = canvas.getContext('2d');

        const labels = stations.map(s => s.name_en.replace(' Station', ''));
        const data = stations.map(s => s.daily_passengers);
        const colors = stations.map((_, index) => {
            const hue = 240 + (index * 30); // Different hues
            return `hsla(${hue}, 70%, 60%, 0.8)`;
        });
        
        passengerChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Passengers',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8)', '1)')),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            },
                            font: {
                                weight: '600'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                weight: '600'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.formattedValue} passengers`;
                            }
                        }
                    }
                }
            }
        });
        
        console.log('Passenger chart created successfully');
    } catch (error) {
        console.error('Error creating passenger chart:', error);
        showChartError('passenger-chart-container', 'Failed to create passenger chart');
    }
}

function initMap() {
    try {
        if (!analysisData) {
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">No station data available for map</div>';
            }
            return;
        }

        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        if (typeof L === 'undefined') {
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">Leaflet library failed to load</div>';
            return;
        }

        const stations = analysisData.station_analysis?.busiest_stations || [];
        if (stations.length === 0) {
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">No station coordinates available</div>';
            return;
        }

        map = L.map('map').setView([35.7006, 139.739], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        stations.forEach(station => {
            if (station.coordinates && station.coordinates.lat && station.coordinates.lng) {
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background: linear-gradient(135deg, #667eea, #764ba2); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${station.rank}</div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                L.marker([station.coordinates.lat, station.coordinates.lng], {icon: customIcon})
                    .addTo(map)
                    .bindPopup(`<div style="font-family: Inter, sans-serif; padding: 8px;"><strong style="color: #667eea; font-size: 16px;">${station.name_en}</strong><br><span style="color: #64748b; font-size: 14px;">${station.name_jp || ''}</span><br><em style="color: #334155;">${station.operator} • ${station.railway}</em><br><strong style="color: #10b981;">Daily Passengers: ${station.daily_passengers.toLocaleString()}</strong></div>`);
            }
        });

        setTimeout(() => {if (map) map.invalidateSize();}, 100);
        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">Map failed to load: ${error.message}</div>`;
        }
    }
}

function refreshData() {
    const btn = document.querySelector('.refresh-btn');
    const icon = btn.querySelector('i');
    icon.style.animation = 'spin 1s linear infinite';
    btn.disabled = true;

    // Reload data
    loadData().then(success => {
        if (success) {
            updateMetrics();
            populateStationList();
            
            // Update charts with new data
            if (operatorChart) {
                operatorChart.destroy();
                createOperatorChart();
            }
            
            if (passengerChart) {
                passengerChart.destroy();
                createPassengerChart();
            }
            
            showNotification('✅ Data refreshed successfully!');
        } else {
            showNotification('❌ Failed to refresh data');
        }
        
        setTimeout(() => {
            icon.style.animation = '';
            btn.disabled = false;
        }, 1000);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 30px; right: 30px; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px 28px; border-radius: 16px; box-shadow: 0 20px 60px rgba(16, 185, 129, 0.3); z-index: 1000; font-weight: 600; transform: translateX(400px); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
    
    if (message.includes('❌')) {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        notification.style.boxShadow = '0 20px 60px rgba(239, 68, 68, 0.3)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

function showError() {
    document.getElementById('total-passengers').textContent = 'Error';
    document.getElementById('punctuality').textContent = 'Error';
    document.getElementById('avg-delay').textContent = 'Error';
    
    showChartError('operator-chart-container', 'Failed to load operator data');
    showChartError('passenger-chart-container', 'Failed to load passenger data');
    
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">Failed to load map data</div>';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);
if (document.readyState !== 'loading') initDashboard();

// Handle window resize for map
window.addEventListener('resize', function() {
    if (map) setTimeout(() => map.invalidateSize(), 100);
});
