# DevOps Portfolio Website

[![CI/CD Pipeline](https://github.com/BGannon2/Personal-Site/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BGannon2/Personal-Site/actions/workflows/ci-cd.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat&logo=github)](https://bgannon2.github.io/Personal-Site/)

A modern, responsive portfolio website designed specifically for DevOps engineers to showcase their skills, projects, and experience. Built with clean HTML5, modern CSS3, and vanilla JavaScript for optimal performance and compatibility.

## ✨ Features

- **Modern Dark Theme**: Professional dark design with cyan/blue gradient accents
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Animations**: Smooth scroll animations, hover effects, and counter animations
- **Performance Optimized**: Fast loading times with optimized CSS and JavaScript
- **SEO Friendly**: Semantic HTML structure and meta tags for better search visibility
- **Accessibility Focused**: WCAG compliant with keyboard navigation support
- **Professional Sections**:
  - Hero section with animated code preview
  - About section with animated statistics
  - Skills showcase with technology categories
  - Projects portfolio with hover effects
  - Contact form with validation
- **Enhanced UX**: Smooth scrolling, progress indicator, and mobile hamburger menu

## 🚀 Quick Start

### Option 1: Direct File Access (Recommended for Testing)
1. Clone or download this repository
2. Open `src/index.html` directly in your web browser
3. The website will work immediately without any server setup

### Option 2: Development Server (For Advanced Users)
```bash
# Clone the repository
git clone https://github.com/yourusername/devops-portfolio-website.git

# Navigate to project directory
cd devops-portfolio-website

# Install dependencies (requires Node.js)
npm install

# Start development server
npm start
```

### Option 3: Production Build
```bash
# Build for production
npm run build

# Serve the dist folder with any web server
```

## 📁 Project Structure

```
devops-portfolio-website/
├── src/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   ├── main.css           # Primary styles
│   │   └── responsive.css     # Mobile responsiveness
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   └── animations.js     # Animation library
│   ├── assets/
│   │   └── fonts/            # Custom fonts directory
│   └── components/           # Legacy component files
├── package.json              # NPM configuration
├── webpack.config.js         # Webpack configuration
├── CUSTOMIZATION.md          # Detailed customization guide
└── README.md                 # This file
```

## 🎨 Customization

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions on:
- Updating personal information
- Modifying colors and styling
- Adding your projects and skills
- Deployment options
- SEO optimization

### Quick Customization Checklist
- [ ] Update personal information in `src/index.html`
- [ ] Replace placeholder email and social links
- [ ] Add your real projects and descriptions
- [ ] Update skills and technologies
- [ ] Customize colors in CSS variables
- [ ] Add your professional photo
- [ ] Test on mobile devices

## 🛠 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JS for animations and interactions
- **FontAwesome**: Professional icons
- **Google Fonts**: Inter typography
- **Webpack**: Module bundling and development server
- **NPM**: Package management

## 📱 Browser Support

- ✅ Chrome 80+ (Recommended)
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main/master)
4. Access at `https://yourusername.github.io/repository-name`

### Netlify (Free)
1. Connect GitHub repository to Netlify
2. Deploy automatically on push
3. Custom domain support available

### Vercel (Free)
1. Import GitHub repository to Vercel
2. Automatic deployments and preview URLs
3. Excellent performance optimization

### Traditional Web Hosting
1. Build the project: `npm run build`
2. Upload `dist/` folder contents to your web server
3. Configure domain and SSL

## 🔧 Development

### File Structure Explained
- `index.html`: Single-page application with all sections
- `main.css`: Core styles with CSS custom properties
- `responsive.css`: Mobile-first responsive design
- `main.js`: Navigation, form handling, and UI interactions
- `animations.js`: Advanced animation library with Intersection Observer

### Key Features Implementation
- **Responsive Navigation**: CSS-based hamburger menu with smooth transitions
- **Smooth Scrolling**: Native CSS `scroll-behavior` with JavaScript fallback
- **Animations**: Intersection Observer API for performance-optimized scroll animations
- **Form Handling**: Client-side validation with accessibility features
- **Performance**: Throttled scroll events and optimized asset loading

## 📈 Performance Features

- Optimized CSS with minimal redundancy
- Efficient JavaScript with event throttling
- Lazy loading for images (when added)
- Minified production builds
- CDN-hosted external dependencies

## 🎯 SEO & Accessibility

- Semantic HTML5 structure
- ARIA labels and roles
- High contrast color ratios
- Keyboard navigation support
- Mobile-friendly meta tags
- OpenGraph and Twitter Card support

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers and devices
5. Submit a pull request

## 📞 Support

- Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed guides
- Open an issue for bugs or feature requests
- Review browser console for any JavaScript errors

---

**Built with ❤️ for the DevOps community**

Transform your career with a professional portfolio that showcases your DevOps expertise!