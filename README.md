# Time Tourist 🚀

**Journey through 13.8 billion years of cosmic history**

Time Tourist is an interactive web application that lets you explore the entire timeline of the universe, from the Big Bang to the heat death of the universe. Navigate through cosmic epochs, geological eras, and human history with an intuitive logarithmic time slider.

## ✨ Features

- **🌌 Complete Timeline**: Explore 13.8 billion years of history in one seamless interface
- **📊 Logarithmic Scale**: Intelligent scaling provides detailed resolution for human history while covering cosmic timescales
- **🎥 Rich Media**: Watch YouTube videos about major historical events and scientific phenomena
- **🧠 Smart Content**: Always shows relevant events - when no exact matches exist, displays closest historical events
- **♿ Fully Accessible**: WCAG 2.1 AA compliant with comprehensive keyboard navigation and screen reader support
- **🌙 Light/Dark Mode**: Automatic theme detection with manual override
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ GitHub Pages Ready**: Static build process perfect for deployment

## 🚀 Quick Start & Deployment

### Deploy to GitHub Pages (Recommended)

**Ready to deploy in 3 steps:**

1. **Fork or clone this repository**
2. **Enable GitHub Pages** in your repository settings
3. **Your site is live!** at `https://yourusername.github.io/time-tourist`

### Detailed Deployment Instructions

#### Method 1: Simple GitHub Pages

1. **Fork this repository** or create a new repository with these files
2. **Go to Settings** → **Pages** in your GitHub repository
3. **Under "Source"** select **"Deploy from a branch"**
4. **Choose "main" branch** and **"/ (root)" folder**
5. **Click "Save"**
6. **Your site will be available** at `https://yourusername.github.io/repository-name`

#### Method 2: GitHub Actions (Automatic builds)

1. **Go to Settings** → **Pages** in your repository
2. **Under "Source"** select **"GitHub Actions"**
3. **The included workflow** (`.github/workflows/deploy.yml`) will automatically:
   - Build the data file from CSV on every push
   - Deploy to GitHub Pages
   - Handle any future updates automatically

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/time-tourist.git
cd time-tourist

# Build the data file from CSV
node build.js

# Serve locally (any static server works)
python3 -m http.server 8000
# or
npx serve .
# or
npx http-server
```

Then open http://localhost:8000 in your browser.

## 🏗️ Architecture

### Build Process

Time Tourist uses a simple build process to convert historical events from CSV format to JavaScript:

```bash
# Convert youtubes.csv to data/events.js
node build.js
```

This generates a static JavaScript file that's loaded by the web app, making it perfect for GitHub Pages deployment.

### File Structure

```
time-tourist/
├── index.html          # Main HTML file
├── script.js           # Application logic (Web Components)
├── style.css           # Styling with light/dark mode support
├── youtubes.csv        # Historical events database
├── build.js            # CSV to JavaScript converter
├── data/
│   └── events.js       # Generated events data (created by build.js)
└── README.md           # This file
```

### Logarithmic Time Scale

The slider uses a sophisticated multi-segment logarithmic mapping:

- **Deep BCE** (0-10%): -13.8 billion to -25,000 years (logarithmic)
- **Recent BCE** (10-25%): -25,000 to -3,000 years (linear for detail)
- **History** (25-75%): -3,000 to 3,000 years (linear for detail)  
- **Future CE** (75-90%): 3,000 to 25,000 years (logarithmic)
- **Far Future CE** (90-100%): 25,000 to 10^78 years (logarithmic)

This provides high resolution for human history while covering the entire cosmic timeline.

## 🎮 Usage

### Navigation

- **Slider**: Drag or use arrow keys to navigate through time
- **Quick Buttons**: Jump to Big Bang, Present Day, or Heat Death
- **Keyboard Shortcuts**:
  - `Home` - Jump to Big Bang
  - `End` - Jump to Heat Death  
  - `Page Up/Down` - Large time jumps
  - `Ctrl/Cmd + N` - Jump to present day
  - `Arrow Keys` - Navigate events list

### Accessibility Features

- **Screen Reader Support**: Full ARIA labeling and live regions
- **Keyboard Navigation**: Complete app functionality via keyboard
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast**: Automatic support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### Media Integration

Click "Watch Video" buttons to explore YouTube videos about historical events. Videos are embedded using privacy-enhanced YouTube domains.

## 🛠️ Development

### Adding New Events

1. Edit `youtubes.csv` with new historical events:
   ```csv
   Year,Event,YouTube Title,YouTube URL
   -65000000,Asteroid Impact,The Day the Dinosaurs Died,https://youtube.com/watch?v=...
   ```

2. Rebuild the data file:
   ```bash
   node build.js
   ```

### Content Intelligence

Time Tourist features a smart content system that ensures users always have something to explore:

- **Exact Matches**: When events exist for the current time period, they display normally
- **Nearest Fallback**: When no events exist nearby, shows the closest 1-3 events from the entire timeline
- **Visual Indicators**: Closest events are clearly labeled with "(closest event)" and subtle styling
- **Educational Priority**: Always prioritizes showing videos and educational content over temporal precision

This means whether you're exploring empty cosmic periods or dense historical eras, you'll always find engaging content to learn from.

### CSV Format

The `youtubes.csv` file contains historical events with the following columns:

- **Year**: Integer year (negative for BCE, positive for CE)
- **Event**: Description of the historical event
- **YouTube Title**: Title of the related YouTube video
- **YouTube URL**: Full YouTube URL

Example:
```csv
Year,Event,YouTube Title,YouTube URL
-13800000000,Big Bang,What is the Big Bang Theory?,https://www.youtube.com/watch?v=wNDGgL73ihY
1969,Moon landing,Apollo 11 Moon Landing,https://www.youtube.com/watch?v=S9HdPi9Ikhk
```

### Customizing Themes

Edit `style.css` to customize the light and dark themes:

```css
/* Light mode */
body:not(.dark-mode) {
    background: your-light-gradient;
    color: your-light-text-color;
}

/* Dark mode */  
body.dark-mode {
    background: your-dark-gradient;
    color: your-dark-text-color;
}
```

## 🧪 Testing

### Accessibility Testing

```bash
# Install axe-core for accessibility testing
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:8000
```

### Browser Testing

Time Tourist is tested and supported on:

- ✅ Chrome 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Edge 90+

### Manual Testing Checklist

- [ ] Slider navigation works smoothly
- [ ] All keyboard shortcuts function
- [ ] YouTube videos embed correctly
- [ ] Light/dark mode toggle works
- [ ] Screen reader announcements are clear
- [ ] Mobile responsive design works
- [ ] High contrast mode is supported

## 🎯 Roadmap

- [ ] **Audio Narration**: Add text-to-speech for events
- [ ] **Search Functionality**: Search historical events
- [ ] **Bookmarking**: Save favorite time periods
- [ ] **Sharing**: Generate shareable URLs for specific years
- [ ] **Animations**: Smooth transitions between time periods
- [ ] **Podcast Integration**: Add podcast episodes alongside YouTube videos
- [ ] **Multi-language Support**: Internationalization
- [ ] **API Integration**: Real-time data from historical databases

## 🤝 Contributing

Contributions are welcome! Here's how to help:

### Adding Historical Events

1. Research historical accuracy
2. Find appropriate YouTube videos (educational content preferred)
3. Add to `youtubes.csv` following the format
4. Test the build process
5. Submit a pull request

### Bug Reports

Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

### Feature Requests

Open an issue with:
- Clear description of the feature
- Use case explanation
- Mockups or examples (if applicable)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Historical Data**: Various Wikipedia sources and educational content
- **YouTube Videos**: Educational channels and content creators
- **Accessibility Guidelines**: WCAG 2.1 standards
- **Design Inspiration**: Cosmic calendar concept by Carl Sagan

## 🔗 Links

- [Live Demo](https://yourusername.github.io/time-tourist)
- [GitHub Repository](https://github.com/yourusername/time-tourist)
- [Issues & Bug Reports](https://github.com/yourusername/time-tourist/issues)
- [Contributing Guide](https://github.com/yourusername/time-tourist/blob/main/CONTRIBUTING.md)

---

**Built with ❤️ for curious minds exploring the cosmos**
