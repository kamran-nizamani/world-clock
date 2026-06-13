# 🌍 World Time Zone Clock

A beautiful, responsive digital clock application that displays the current time across multiple time zones simultaneously. Perfect for international teams, travelers, and anyone who needs to track time across the globe.

## ✨ Features

- **Digital & Analog Clocks**: Real-time display of time in both digital and analog formats
- **34+ Timezones**: Support for major cities worldwide across all continents
- **Search & Add**: Quickly search and add any timezone with an intuitive search interface
- **Persistent Storage**: Your selected timezones are saved in browser's local storage
- **Copy to Clipboard**: Easily copy the current time with one click
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI**: Dark theme with smooth animations and gradient effects
- **Real-time Updates**: Clock updates every second with precision
- **Timezone Details**: View UTC offset, region, and formatted date for each timezone

## 🚀 Quick Start

### Option 1: Direct Usage
Simply open `index.html` in your web browser. No installation or build process required!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/kamran-nizamani/world-clock.git

# Navigate to the project directory
cd world-clock

# Open in your browser (any local server will work)
python -m http.server 8000
# or
npx http-server

# Visit http://localhost:8000
```

## 📖 How to Use

### Adding Timezones
1. Click the **"+ Add Timezone"** button
2. Browse or search for your desired timezone
3. Click on a timezone to select it
4. The clock card will instantly appear

### Searching for Timezones
- Use the search box at the top to find timezones quickly
- Search by city name or timezone identifier
- Results are organized by region

### Removing Timezones
- Click the **"✕ Remove"** button on any clock card
- The timezone is immediately removed

### Copying Time
- Click the **"📋 Copy Time"** button on any clock card
- The current time and date are copied to your clipboard
- Button provides visual feedback when copied

### Reset to Default
- Click **"Reset to Default"** to return to New York, London, and Tokyo

## 🎨 Features in Detail

### Digital Clock
- Large, easy-to-read time display
- 24-hour format (HH:MM:SS)
- Green glow effect for modern aesthetic
- Blinking animation for visual appeal

### Analog Clock
- Traditional clock face representation
- Hour, minute, and second hands
- Smooth rotation animations
- Color-coded hands for easy reading

### Time Details
- Full date display (Month, Day, Year)
- Day of the week
- UTC offset information
- Geographic region

### Persistent Storage
- Your selected timezones are automatically saved
- Settings persist across browser sessions
- Uses browser's localStorage API

## 🌐 Supported Timezones

The application includes 34+ major timezones:

**Americas:**
- New York, Los Angeles, Chicago, Denver, Anchorage, Honolulu
- Toronto, Mexico City, São Paulo, Buenos Aires

**Europe:**
- London, Paris, Berlin, Madrid, Rome, Amsterdam
- Moscow, Istanbul, Dublin, Athens

**Asia:**
- Dubai, Bangalore, Bangkok, Singapore, Hong Kong
- Shanghai, Tokyo, Seoul, Jakarta, Manila

**Pacific:**
- Sydney, Melbourne, Auckland, Fiji

**Africa:**
- Cairo, Johannesburg, Lagos, Nairobi

More timezones can be easily added by modifying the `ALL_TIMEZONES` array in `script.js`.

## 🛠️ Technical Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with gradients, animations, and responsive grid layout
- **JavaScript (ES6+)**: Modern JavaScript with:
  - Intl.DateTimeFormat API for timezone handling
  - LocalStorage for state persistence
  - Event delegation and DOM manipulation
  - Smooth animations and transitions

## 📱 Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

- **Remote Teams**: Coordinate meetings across time zones
- **Global Businesses**: Track international market hours
- **Travelers**: Monitor multiple time zones simultaneously
- **Developers**: Manage deployments across regions
- **International Organizations**: Maintain global awareness

## 🚀 Performance

- **Zero Dependencies**: No external libraries or frameworks
- **Lightweight**: Minimal CSS and JavaScript
- **Fast Load Time**: Instant rendering
- **Smooth Animations**: 60 FPS animations using CSS transforms
- **Efficient Updates**: Smart DOM updates only where needed

## 📚 Code Architecture

```
├── index.html          # Main HTML structure
├── styles.css          # All styling (1000+ lines)
├── script.js           # Application logic
└── README.md          # Documentation
```

### Key JavaScript Components:

1. **State Management**: `selectedTimezones`, `updateInterval`
2. **Timezone Data**: `ALL_TIMEZONES` array with metadata
3. **Rendering**: `renderClocks()`, `updateClock()`
4. **UI Interactions**: Modal, search, copy functionality
5. **Storage**: LocalStorage for persistence

## 🔧 Customization

### Adding New Timezones
Edit `script.js` and add to the `ALL_TIMEZONES` array:
```javascript
{ 
    name: 'City Name', 
    timezone: 'Continent/City', 
    region: 'Region', 
    offset: 'UTC±X' 
}
```

### Changing Default Timezones
Edit the `DEFAULT_TIMEZONES` array in `script.js`:
```javascript
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    // Add more...
];
```

### Styling Customization
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more variables */
}
```

## 🐛 Troubleshooting

### Times are incorrect
- Ensure your system clock is set correctly
- Check browser timezone settings
- Clear browser cache and reload

### Clock not updating
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

### Timezone not found
- Use the exact timezone identifier
- Check the IANA timezone database
- Search by city name instead

## 📖 Resources

- [IANA Timezone Database](https://www.iana.org/time-zones)
- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [JavaScript Clock Guide](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

## 📝 License

MIT License - Feel free to use, modify, and distribute this project.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add More Timezones**: Expand the timezone database
2. **Improve UI/UX**: Design enhancements and layouts
3. **Bug Reports**: Report issues and suggest improvements
4. **Optimizations**: Performance and code quality improvements
5. **Documentation**: Improve guides and examples

### Development Setup
```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/world-clock.git

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes
# Commit and push
git push origin feature/your-feature

# Create a Pull Request
```

## 🌟 Features You Can Add

- Weather integration
- Timezone conversion calculator
- Alarm functionality
- Multiple display formats
- Dark/Light theme toggle
- Voice announcements
- Calendar integration
- Productivity metrics

## 📧 Contact & Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Submit a discussion
- Check existing issues for solutions

## 🙏 Acknowledgments

- IANA for the timezone database
- Community feedback and suggestions
- Modern web standards and best practices

---

**Made with ❤️ for global coordination**

*Last Updated: June 2026*