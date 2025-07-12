// Tokyo Traffic Dashboard - Chart Implementation
// Version 3.2 - Step 2: Chart functionality

console.log('🚀 Tokyo Traffic Dashboard v3.2 - Chart Module Loading');

// Station data
const stations = [
    {rank: 1, name: 'Shinjuku Station', operator: 'JR-East', railway: 'Yamanote', passengers: 753000, lat: 35.6896, lng: 139.7006},
    {rank: 2, name: 'Ikebukuro Station', operator: 'Tokyo Metro', railway: 'Marunouchi', passengers: 558000, lat: 35.7295, lng: 139.7109},
    {rank: 3, name: 'Tokyo Station', operator: 'JR-East', railway: 'Yamanote', passengers: 462000, lat: 35.6812, lng: 139.7671},
    {rank: 4, name: 'Ueno Station', operator: 'Tokyo Metro', railway: 'Hibiya', passengers: 198000, lat: 35.7148, lng: 139.7774},
    {rank: 5, name: 'Ginza Station', operator: 'Tokyo Metro', railway: 'Ginza', passengers: 180000, lat: 35.6717, lng: 139.7647}
];

let operatorChart, passengerChart, map;
let chartAttempts = 0;
const maxChartAttempts = 5;

function init() {
    console.log('🔧 Initializing dashboard...');
    updateTime();
    populateStations();
    attemptChartCreation();
    setTimeout(initMap, 200);
    setInterval(updateTime, 1000);
    console.log('✅ Dashboard ready!');
}

function attemptChartCreation() {
    chartAttempts++;
    console.log('📊 Chart creation attempt ' + chartAttempts + '/' + maxChartAttempts);
    
    if (typeof Chart !== 'undefined') {
        createCharts();
    } else if (chartAttempts < maxChartAttempts) {
        console.log('⏳ Chart.js not ready, retrying in 500ms...');
        setTimeout(attemptChartCreation, 500);
    } else {
        console.log('❌ Chart.js failed to load, using fallback');
        createFallbackCharts();
    }
}

function updateTime() {
    document.getElementById('current-time').textContent = 
        new Date().toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Tokyo'}) + ' JST';
}

function populateStations() {
    const list = document.getElementById('station-list');
    list.innerHTML = stations.map(s => 
        '<li class="station-item">' +
            '<div class="rank-badge">' + s.rank + '</div>' +
            '<div class="station-info">' +
                '<div class="station-name">' + s.name + '</div>' +
                '<div class="station-details">' + s.operator + ' • ' + s.railway + ' Line</div>' +
            '</div>' +
            '<div class="passenger-count">' + s.passengers.toLocaleString() + '</div>' +
        '</li>'
    ).join('');
    console.log('✅ Stations populated');
}

function createCharts() {
    console.log('📊 Creating Chart.js charts...');
    try {
        createOperatorChart();
        createPassengerChart();
    } catch (error) {
        console.error('❌ Chart creation error:', error);
        createFallbackCharts();
    }
}

function createOperatorChart() {
    const container = document.getElementById('operatorChartContainer');
    const canvas = document.getElementById('operatorChart');
    const loading = container.querySelector('.chart-loading');
    
    try {
        if (!canvas || !canvas.getContext) {
            throw new Error('Canvas not available');
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        const jrPassengers = stations.filter(s => s.operator === 'JR-East').reduce((sum, s) => sum + s.passengers, 0);
        const metroPassengers = stations.filter(s => s.operator === 'Tokyo Metro').reduce((sum, s) => sum + s.passengers, 0);

        operatorChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['JR-East', 'Tokyo Metro'],
                datasets: [{
                    data: [jrPassengers, metroPassengers],
                    backgroundColor: ['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom', 
                        labels: { 
                            padding: 15, 
                            font: { size: 12, weight: '600' }
                        } 
                    }
                }
            }
        });
        
        loading.style.display = 'none';
        canvas.style.display = 'block';
        console.log('✅ Operator chart created successfully');
        
    } catch (error) {
        console.error('❌ Operator chart error:', error);
        createFallbackOperatorChart(container);
    }
}

function createPassengerChart() {
    const container = document.getElementById('passengerChartContainer');
    const canvas = document.getElementById('passengerChart');
    const loading = container.querySelector('.chart-loading');
    
    try {
        if (!canvas || !canvas.getContext) {
            throw new Error('Canvas not available');
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        passengerChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stations.map(s => s.name.replace(' Station', '')),
                datasets: [{
                    label: 'Daily Passengers',
                    data: stations.map(s => s.passengers),
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderRadius: 8
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
                            }
                        }
                    }
                },
                plugins: { 
                    legend: { display: false }
                }
            }
        });
        
        loading.style.display = 'none';
        canvas.style.display = 'block';
        console.log('✅ Passenger chart created successfully');
        
    } catch (error) {
        console.error('❌ Passenger chart error:', error);
        createFallbackPassengerChart(container);
    }
}

function createFallbackCharts() {
    console.log('🎨 Creating fallback charts...');
    createFallbackOperatorChart(document.getElementById('operatorChartContainer'));
    createFallbackPassengerChart(document.getElementById('passengerChartContainer'));
}

function createFallbackOperatorChart(container) {
    const jrPassengers = stations.filter(s => s.operator === 'JR-East').reduce((sum, s) => sum + s.passengers, 0);
    const metroPassengers = stations.filter(s => s.operator === 'Tokyo Metro').reduce((sum, s) => sum + s.passengers, 0);
    const total = jrPassengers + metroPassengers;
    const jrPercent = Math.round((jrPassengers / total) * 100);
    const metroPercent = 100 - jrPercent;

    container.innerHTML = 
        '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center;">' +
            '<div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#667eea 0deg ' + (jrPercent * 3.6) + 'deg, #764ba2 ' + (jrPercent * 3.6) + 'deg 360deg); display: flex; align-items: center; justify-content: center; margin: 20px 0; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);">' +
                '<div style="width: 80px; height: 80px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #667eea;">' + jrPercent + '%</div>' +
            '</div>' +
            '<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">' +
                '<div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 600;">' +
                    '<div style="width: 16px; height: 16px; border-radius: 3px; background: #667eea;"></div>' +
                    '<span>JR-East (' + jrPercent + '%)</span>' +
                '</div>' +
                '<div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 600;">' +
                    '<div style="width: 16px; height: 16px; border-radius: 3px; background: #764ba2;"></div>' +
                    '<span>Tokyo Metro (' + metroPercent + '%)</span>' +
                '</div>' +
            '</div>' +
        '</div>';
    console.log('✅ Fallback operator chart created');
}

function createFallbackPassengerChart(container) {
    const maxPassengers = Math.max(...stations.map(s => s.passengers));
    const colors = ['#667eea', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    
    const barsHtml = stations.map((station, index) => {
        const height = Math.round((station.passengers / maxPassengers) * 100);
        return '<div style="height: ' + height + '%; background: linear-gradient(135deg, ' + colors[index] + ', ' + colors[index] + '99); border-radius: 6px 6px 0 0; min-width: 40px; display: flex; flex-direction: column; align-items: center; justify-content: end; color: white; font-weight: 600; font-size: 0.8rem; padding: 4px; position: relative; transition: all 0.3s ease;" title="' + station.name + ': ' + station.passengers.toLocaleString() + ' passengers">' +
            Math.round(station.passengers / 1000) + 'k' +
            '<div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #64748b; font-weight: 600; white-space: nowrap;">' + station.name.split(' ')[0] + '</div>' +
        '</div>';
    }).join('');
    
    container.innerHTML = 
        '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center;">' +
            '<h3 style="margin-bottom: 10px; color: #667eea;">Daily Passenger Count by Station</h3>' +
            '<div style="display: flex; align-items: end; gap: 12px; margin: 20px 0; height: 120px;">' + barsHtml + '</div>' +
            '<p style="font-size: 0.85rem; color: #64748b; margin-top: 10px;">Hover over bars to see details</p>' +
        '</div>';
    console.log('✅ Fallback passenger chart created');
}

function initMap() {
    console.log('🗺️ Creating map...');
    try {
        if (typeof L === 'undefined') { 
            console.log('❌ Leaflet not loaded'); 
            document.getElementById('map').innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">Map library not loaded</div>';
            return; 
        }
        
        map = L.map('map').setView([35.7006, 139.739], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        stations.forEach(s => {
            const icon = L.divIcon({
                html: '<div style="background: linear-gradient(135deg, #667eea, #764ba2); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">' + s.rank + '</div>',
                iconSize: [30, 30], 
                iconAnchor: [15, 15]
            });
            L.marker([s.lat, s.lng], {icon}).addTo(map)
                .bindPopup('<strong>' + s.name + '</strong><br>' + s.operator + '<br>Passengers: ' + s.passengers.toLocaleString());
        });

        setTimeout(() => map.invalidateSize(), 100);
        console.log('✅ Map created');
    } catch (error) {
        console.error('❌ Map error:', error);
        document.getElementById('map').innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444; font-weight: 600;">Map failed to load</div>';
    }
}

function refreshData() {
    const btn = document.querySelector('.refresh-btn');
    const icon = btn.querySelector('i');
    icon.style.animation = 'spin 1s linear infinite';
    btn.disabled = true;

    setTimeout(() => {
        const variation = Math.floor(Math.random() * 20000) - 10000;
        const current = parseInt(document.getElementById('total-passengers').textContent.replace(/,/g, ''));
        document.getElementById('total-passengers').textContent = Math.max(0, current + variation).toLocaleString();
        
        const newPunctuality = (94.2 + (Math.random() - 0.5) * 3).toFixed(1);
        document.getElementById('punctuality').textContent = newPunctuality + '%';
        
        icon.style.animation = '';
        btn.disabled = false;
        console.log('✅ Data refreshed');
    }, 1000);
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('resize', () => { 
    if (map) setTimeout(() => map.invalidateSize(), 100); 
});

console.log('✅ Chart module loaded successfully');