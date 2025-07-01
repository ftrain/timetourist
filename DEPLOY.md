# Deployment Guide for Time Tourist

## Quick GitHub Pages Setup

### 1. Prepare Your Repository

```bash
# Clone/fork this repository
git clone https://github.com/yourusername/time-tourist.git
cd time-tourist

# Build the data file
npm run build
# or
node build.js

# Commit all files
git add .
git commit -m "Initial Time Tourist setup"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your site will be available at: `https://yourusername.github.io/time-tourist`

### 3. Automatic Deployment (Optional)

The included GitHub Action (`.github/workflows/deploy.yml`) will automatically:
- Build the data file from CSV
- Deploy to GitHub Pages on every push to main

To enable:
1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will run automatically on your next push

## Manual Deployment

### Static Hosting Services

Time Tourist works with any static hosting service:

#### Netlify
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository

#### Vercel
```bash
npx vercel --prod
```

#### Firebase Hosting
```bash
firebase deploy
```

### Local Development

```bash
# Build data file
npm run build

# Serve locally
npm run serve
# or
python3 -m http.server 8000
# or 
npx serve .
```

## Build Process

The build script (`build.js`) converts `youtubes.csv` to `data/events.js`:

```bash
node build.js
```

This creates a static JavaScript file that's loaded by the web app, eliminating the need for server-side processing.

## File Requirements

For GitHub Pages deployment, ensure these files are present:

- ✅ `index.html` - Main HTML file
- ✅ `script.js` - Application logic  
- ✅ `style.css` - Styling
- ✅ `data/events.js` - Generated events data (created by build.js)
- ✅ `youtubes.csv` - Source data (optional for deployment, but needed for rebuilds)

## Troubleshooting

### Build Issues

If `node build.js` fails:
1. Ensure Node.js is installed (`node --version`)
2. Check that `youtubes.csv` exists and is valid
3. Verify the `data/` directory was created

### GitHub Pages Not Loading

1. Check that `data/events.js` is committed to the repository
2. Verify GitHub Pages is enabled in repository settings
3. Ensure the main branch is selected as the source
4. Wait a few minutes for changes to propagate

### Missing Events

If historical events don't display:
1. Open browser developer console and check for errors
2. Verify `data/events.js` loads successfully (Network tab)
3. Check that the file contains valid JavaScript
4. Rebuild with `node build.js`

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   ```
   CNAME www yourusername.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

## Performance Tips

- The app loads quickly as it's entirely static
- Images and videos are loaded on-demand
- YouTube embeds use privacy-enhanced domains
- CSS and JS are minimal and optimized

---

Your Time Tourist is now ready to explore the cosmos! 🚀