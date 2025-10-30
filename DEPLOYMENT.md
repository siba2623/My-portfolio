# Deployment Guide

This guide will help you deploy your professional portfolio to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. GitHub Pages (Free)
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify dashboard
3. Or connect your GitHub repository for automatic deployments
4. Custom domain available with free plan

### 3. Vercel (Free)
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployments on every push
4. Excellent performance and CDN

### 4. Surge.sh (Free)
```bash
npm install -g surge
cd My-portfolio
surge
```

## 📝 Pre-Deployment Checklist

### Content Updates
- [ ] Update personal information in `index.html`
- [ ] Replace placeholder images with your photos
- [ ] Update project links and descriptions
- [ ] Add your actual resume PDF to `Assests/` folder
- [ ] Update social media links
- [ ] Replace Formspree form action with your endpoint

### Technical Optimizations
- [ ] Optimize images (compress and resize)
- [ ] Test all links and forms
- [ ] Verify responsive design on different devices
- [ ] Test dark/light theme toggle
- [ ] Check loading performance
- [ ] Validate HTML and CSS

### SEO & Social Media
- [ ] Update meta tags with your information
- [ ] Add proper Open Graph images
- [ ] Create a custom favicon
- [ ] Add Google Analytics (optional)
- [ ] Submit to search engines

## 🔧 Custom Domain Setup

### For GitHub Pages:
1. Add a `CNAME` file with your domain name
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

### For Netlify/Vercel:
1. Add custom domain in dashboard
2. Follow DNS configuration instructions
3. SSL certificates are automatically provided

## 📊 Performance Optimization

### Image Optimization
```bash
# Install imagemin-cli globally
npm install -g imagemin-cli

# Optimize images
imagemin *.jpg --out-dir=optimized --plugin=imagemin-mozjpeg
imagemin *.png --out-dir=optimized --plugin=imagemin-pngquant
```

### Enable Gzip Compression
Add to your hosting platform or `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 🔍 Analytics Setup (Optional)

### Google Analytics 4
Add before closing `</head>` tag:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor form submissions
- Update project portfolio regularly
- Check for broken links
- Monitor site performance

### Backup Strategy
- Keep source code in version control (Git)
- Regular backups of any dynamic content
- Document any custom configurations

## 📞 Support

If you need help with deployment:
- Check hosting platform documentation
- Use browser developer tools for debugging
- Test on multiple devices and browsers
- Consider using Lighthouse for performance audits

---

Good luck with your deployment! 🚀