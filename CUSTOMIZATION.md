# DevOps Portfolio Website Customization Guide

## Quick Start Customization

### 1. Personal Information
Update the following sections in `src/index.html`:

**Hero Section (Lines 44-52):**
- Replace "Lead DevOps Engineer" with your actual title
- Update the subtitle description
- Modify the call-to-action buttons

**About Section (Lines 86-120):**
- Update the personal description
- Modify background and interests sections
- Update statistics (years of experience, projects, uptime)

**Contact Section (Lines 262-286):**
- Replace placeholder email: `your.email@example.com`
- Update LinkedIn URL: `https://linkedin.com/in/yourprofile`
- Update GitHub URL: `https://github.com/yourprofile`

### 2. Project Customization
**Projects Section (Lines 218-261):**
- Replace project titles and descriptions
- Update technology tags
- Add real GitHub and demo links
- Add more project cards by copying the `.project-card` structure

### 3. Skills Customization
**Skills Section (Lines 122-217):**
- Add/remove skill categories
- Update technology tags
- Modify icons (FontAwesome classes)

### 4. Styling Customization
**Colors (`src/css/main.css` Lines 1-15):**
```css
:root {
    --primary-color: #00d4ff;    /* Main accent color */
    --secondary-color: #ff6b6b;  /* Secondary accent */
    --accent-color: #4ecdc4;     /* Additional accent */
    /* Modify these to match your brand */
}
```

### 5. Adding Your Photo
1. Add your photo to `src/assets/images/` (create folder if needed)
2. In the about section, add:
```html
<div class="about-photo">
    <img src="assets/images/your-photo.jpg" alt="Your Name">
</div>
```

### 6. Custom Domain and Deployment
**For GitHub Pages:**
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/repository-name`

**For Custom Domain:**
1. Add CNAME file to root directory
2. Configure DNS settings with your domain provider

### 7. SEO Optimization
**Update meta tags in `<head>` section:**
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="DevOps, Your Name, Cloud, Kubernetes">
<meta property="og:title" content="Your Name - DevOps Engineer">
<meta property="og:description" content="Your description">
```

### 8. Performance Optimization
**Image Optimization:**
- Use WebP format for images
- Compress images before adding
- Add lazy loading: `loading="lazy"`

**Font Optimization:**
- Preload critical fonts
- Use font-display: swap

## Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Mobile Responsiveness
The website includes comprehensive responsive design:
- Mobile-first approach
- Hamburger navigation for mobile
- Touch-friendly buttons and spacing
- Optimized typography for all screen sizes

## Animation Features
- Scroll-triggered animations
- Counter animations for statistics
- Hover effects on interactive elements
- Smooth scrolling navigation
- Parallax effects (subtle)

## Accessibility Features
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Scalable text and UI elements

## Support and Updates
For questions or feature requests, refer to the project documentation or create an issue in the repository.
