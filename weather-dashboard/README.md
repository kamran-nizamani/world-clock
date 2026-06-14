# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API. Get current conditions, 5-day forecasts, and track multiple cities with an intuitive interface.

## ✨ Features

### Core Features
- **Real-time Weather Data**: Current temperature, conditions, humidity, wind speed, and more
- **5-Day Forecast**: Detailed weather predictions for the next 5 days
- **Search Functionality**: Quick city search with autocomplete suggestions
- **Current Location**: Get weather for your current GPS location
- **Saved Cities**: Bookmark favorite cities for quick access (up to 10)
- **Persistent Storage**: All settings and saved cities are stored locally

### Weather Information Displayed
- 🌡️ Current temperature and "feels like" temperature
- 🌦️ Weather conditions with descriptive icons
- 💧 Humidity percentage
- 💨 Wind speed (convertible between m/s, km/h, mph)
- 🌀 Atmospheric pressure
- 👁️ Visibility distance
- 🌅 Sunrise and sunset times
- 📅 5-day forecast with high/low temperatures

### Customization Options
- **Temperature Unit**: Switch between Celsius and Fahrenheit
- **Wind Speed Unit**: Choose between m/s, km/h, or mph
- **Auto-Refresh**: Set automatic weather updates (5, 10, or 30 minutes)
- **Theme**: Beautiful dark theme optimized for readability

## 🚀 Quick Start

### Option 1: Direct Usage
1. Download all files to your computer
2. Open `index.html` in your web browser
3. Start searching for cities!

### Option 2: GitHub Pages
If hosted on GitHub Pages, simply visit your deployed URL.

### Option 3: Local Server
```bash
# Navigate to the project directory
cd weather-dashboard

# Start a local server
python -m http.server 8000
# or
npx http-server

# Open http://localhost:8000
```

## 📖 How to Use

### Search for a City
1. Type a city name in the search box
2. Click the search button or press Enter
3. View current weather and forecast

### Use Current Location
1. Click "Current Location" button
2. Allow browser to access your location
3. Weather will load automatically

### Save a City
- Search for a city - it automatically saves to your list
- Click on any saved city card to view its weather
- Click the ✕ button to remove from saved cities

### Adjust Settings
1. Click the ⚙️ Settings button
2. Choose your preferred units and refresh rate
3. Click "Save Settings"

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: OpenWeatherMap Free Tier
- **Storage**: Browser LocalStorage
- **Icons**: Font Awesome 6.4
- **Architecture**: Modular, event-driven design

## 📡 API Integration

### OpenWeatherMap API
- **Endpoint 1**: Current weather data
  ```
  https://api.openweathermap.org/data/2.5/weather
  ```
- **Endpoint 2**: 5-day forecast data
  ```
  https://api.openweathermap.org/data/2.5/forecast
  ```
- **Authentication**: Free API key (included)
- **Rate Limit**: 60 calls/minute for free tier

### Key API Features Used
- City name search
- Geolocation coordinates lookup
- Metric units support
- Weather icon URLs
- Unix timestamp conversion

## 🌍 Supported Features

### Default Search Cities
- London, New York, Tokyo, Paris, Sydney
- Dubai, Singapore, Toronto, Berlin, Mumbai
- Los Angeles, Chicago, Amsterdam, Barcelona, Rome
- Plus any other city worldwide (via OpenWeatherMap)

### Weather Conditions
- Clear sky
- Few clouds
- Scattered clouds
- Broken clouds
- Rain
- Thunderstorm
- Snow
- Mist/Fog
- And more...

## 💾 Data Storage

### LocalStorage Keys
- `savedCities`: Array of bookmarked cities
- `weatherSettings`: User preferences (temperature unit, wind unit, auto-refresh)

### Data Structure
```javascript
// Saved Cities
[
    { name: "London", temp: 15, weather: "Partly cloudy" },
    { name: "New York", temp: 22, weather: "Clear sky" }
]

// Settings
{
    tempUnit: "celsius",
    windUnit: "ms",
    autoRefresh: "10"
}
```

## 🎨 Customization

### Change Default City
Edit `script.js`:
```javascript
// Line in init() function
if (!appState.currentWeather) {
    searchCity('Your City Here');
}
```

### Modify API Key
Replace the API key in `script.js`:
```javascript
const API_KEY = 'your-api-key-here';
```

### Add More Suggestions
Edit the suggestions array in `handleSearchInput()`:
```javascript
const suggestions = [
    'London', 'New York', 'Your City', // Add more
];
```

### Customize Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    /* ... more colors */
}
```

## 📊 Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- No personal data is stored on servers
- All data stored locally in browser
- Geolocation only used when explicitly requested
- API requests are anonymous
- HTTPS recommended for deployment

## ⚠️ Known Limitations

- Free tier API has rate limits (60 calls/minute)
- No historical data available
- Limited to 5-day forecast
- Search suggestions are hardcoded (not API-powered)
- Auto-refresh stops when browser tab is inactive

## 🚀 Future Enhancements

### Planned Features
- [ ] Hourly forecast view
- [ ] Weather alerts and notifications
- [ ] Multiple weather providers (WeatherAPI, Weather.com)
- [ ] Interactive weather maps
- [ ] Air quality index (AQI)
- [ ] UV index information
- [ ] Weather comparison between cities
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Pollen forecast
- [ ] Severe weather warnings
- [ ] Historical weather data

## 🐛 Troubleshooting

### Weather data not loading
- Check internet connection
- Verify API key is valid
- Check browser console for errors
- Ensure city name is spelled correctly

### Location services not working
- Enable location access in browser settings
- Check if running on HTTPS (required for some browsers)
- Clear browser cache and permissions

### Saved cities disappeared
- Check browser's privacy/incognito mode
- Browser may have cleared LocalStorage
- Check if storage quota exceeded

### Icons not displaying
- Verify Font Awesome CDN is accessible
- Check internet connection
- Try refreshing the page

## 📚 Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [OpenWeatherMap Free Tier](https://openweathermap.org/find)
- [Weather Icons Documentation](https://openweathermap.org/weather-conditions)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## 📝 License

MIT License - Feel free to use, modify, and distribute this project.

## 🤝 Contributing

Contributions are welcome! You can:

1. **Report Issues**: Found a bug? Open an issue
2. **Suggest Features**: Have an idea? Share it
3. **Submit PRs**: Improvements and new features
4. **Improve Docs**: Better documentation
5. **Add Translations**: Support more languages

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes
# Commit and push
git push origin feature/your-feature

# Create a Pull Request
```

## 💡 Use Cases

- **Travel Planning**: Check weather before your trip
- **Event Planning**: Plan outdoor events with forecast data
- **Remote Teams**: Monitor weather in different offices
- **Fitness Tracking**: Plan workouts based on weather
- **Agriculture**: Monitor weather patterns for crops
- **Portfolio Project**: Showcase API integration skills
- **Learning Tool**: Learn weather data handling

## 📧 Support

For questions or support:
- Open an issue on GitHub
- Check existing documentation
- Review code comments
- Check API documentation

## 🙏 Acknowledgments

- OpenWeatherMap for the comprehensive weather API
- Font Awesome for beautiful icons
- Community feedback and suggestions
- Weather data provided by meteorological services worldwide

## 🔗 Links

- [GitHub Repository](https://github.com/kamran-nizamani/weather-dashboard)
- [Live Demo](https://kamran-nizamani.github.io/weather-dashboard)
- [OpenWeatherMap](https://openweathermap.org)
- [Font Awesome Icons](https://fontawesome.com)

---

**Made with ❤️ for weather enthusiasts and developers**

*Last Updated: June 2026*
