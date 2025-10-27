# Testing Checklist

Use this checklist to verify all improvements are working correctly.

## 🔍 Visual Testing

### Navigation
- [ ] Mobile menu opens and closes properly
- [ ] Navigation links scroll smoothly to sections
- [ ] Mobile menu closes when clicking a link
- [ ] Header background darkens on scroll

### Hero Section
- [ ] Video loads and plays automatically
- [ ] Poster image displays while video loads
- [ ] Glitch effect animates the title
- [ ] Scroll down arrow is visible and animated

### Portfolio Section
- [ ] Filter buttons work correctly
- [ ] Clicking "All" shows all items
- [ ] Filtering by category shows only relevant items
- [ ] Portfolio items have hover effects
- [ ] Clicking a portfolio item opens video modal
- [ ] YouTube videos play in modal
- [ ] Modal can be closed by:
  - [ ] Clicking the X button
  - [ ] Clicking outside the modal
  - [ ] Pressing Escape key
- [ ] Loading spinner appears briefly when opening modal

### Contact Form
- [ ] Form fields are visible and styled correctly
- [ ] Submit button shows "Sending..." when clicked
- [ ] Form integrates with Formspree (update endpoint first)
- [ ] Success message appears after submission

## ⚡ Performance Testing

### Page Load
- [ ] Page loads quickly (< 3 seconds on good connection)
- [ ] No layout shift when fonts load
- [ ] Video doesn't block initial render
- [ ] Images load progressively

### Interactions
- [ ] Smooth scrolling performance
- [ ] Hover effects are smooth (60fps)
- [ ] Video modal opens quickly
- [ ] No lag when filtering portfolio

## 🔒 Security Testing

### CSP (Content Security Policy)
- [ ] No CSP errors in browser console
- [ ] External resources load correctly:
  - [ ] Google Fonts
  - [ ] AOS library
  - [ ] YouTube embeds
  - [ ] Google Maps

### External Links
- [ ] External links open in new tab
- [ ] No security warnings in console

## 📱 Responsive Testing

Test on multiple screen sizes:

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] Navigation is horizontal
- [ ] All sections display properly

### Tablet (768x1024)
- [ ] Layout adapts appropriately
- [ ] Images scale correctly
- [ ] Text is readable

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] All content is accessible
- [ ] Touch targets are large enough
- [ ] Video scales appropriately

## 🌐 Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

## 🎯 SEO Testing

### Meta Tags
- [ ] View page source and verify:
  - [ ] Title tag is present
  - [ ] Meta description is present
  - [ ] Open Graph tags are present
  - [ ] Twitter Card tags are present

### Social Media Preview
- [ ] Use [OpenGraph.xyz](https://www.opengraph.xyz/) to test social previews
- [ ] Update placeholder URLs to your actual domain

## ♿ Keyboard Navigation

- [ ] Tab through the page
- [ ] Focus indicators are visible (red outline)
- [ ] Can navigate entire site with keyboard
- [ ] Can close modal with Escape key
- [ ] Form is fully keyboard accessible

## 🐛 Error Testing

### Console Errors
- [ ] Open browser DevTools console
- [ ] Check for JavaScript errors
- [ ] Check for CSS errors
- [ ] Check for resource loading errors

### Network Tab
- [ ] All resources load successfully (200 status)
- [ ] No 404 errors
- [ ] Check file sizes are reasonable

## 📝 Before Deployment

- [ ] Update all placeholder text:
  - [ ] Artist name
  - [ ] Professional tagline
  - [ ] About section
  - [ ] Experience
  - [ ] Skills
  - [ ] Contact information

- [ ] Replace all placeholder images:
  - [ ] Headshot (images/artist_headshot.webp)
  - [ ] Portfolio thumbnails (images/thumbnail_*.webp)
  - [ ] Hero video (videos/hero_loop.mp4)

- [ ] Update external links:
  - [ ] LinkedIn profile URL
  - [ ] Formspree endpoint
  - [ ] Google Maps embed
  - [ ] Open Graph URLs

- [ ] Add YouTube video IDs:
  - [ ] Update data-video-id attributes
  - [ ] Test each video opens correctly

- [ ] Optional: Switch to minified assets:
  - [ ] Change css/main.css to css/main.min.css
  - [ ] Change js/main.js to js/main.min.js

## 🚀 Deployment Checklist

- [ ] All changes committed to Git
- [ ] Pushed to GitHub
- [ ] GitHub Pages is enabled
- [ ] Site is accessible at yourusername.github.io
- [ ] All resources load on live site (no local path issues)
- [ ] Test on actual mobile device (not just browser DevTools)

## 🎉 Launch Checklist

- [ ] Share site on social media (test Open Graph tags)
- [ ] Verify social media previews look good
- [ ] Submit to Google Search Console
- [ ] Set up Google Analytics (if desired)
- [ ] Monitor for any user-reported issues

---

## 📊 Performance Benchmarks

After deployment, test with:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - Target: 85+ for Performance
   - Target: 95+ for Best Practices
   - Target: 95+ for SEO

2. **GTmetrix**: https://gtmetrix.com/
   - Target: A grade
   - Target: < 3s load time

3. **WebPageTest**: https://www.webpagetest.org/
   - Target: < 2s First Contentful Paint
   - Target: < 3s Largest Contentful Paint

---

## 🐞 Common Issues & Solutions

### Issue: Video doesn't autoplay
**Solution**: Autoplay with sound is blocked by browsers. The video is muted, which should allow autoplay. If it still doesn't work, it may be due to browser settings or Data Saver mode.

### Issue: Fonts look different
**Solution**: Clear browser cache. Fonts are now loading asynchronously, so there may be a brief moment where fallback fonts show.

### Issue: CSP blocks a resource
**Solution**: Check browser console for the blocked resource and add it to the CSP policy in index.html line 52.

### Issue: Portfolio filter doesn't work
**Solution**: Check browser console for errors. Ensure AOS library loaded successfully.

### Issue: Modal doesn't close
**Solution**: Check that modal JavaScript initialized. Look for errors in console.

---

## ✅ Success Criteria

Your site is ready for launch when:
- ✅ All checklist items above are checked
- ✅ No console errors
- ✅ PageSpeed score > 85
- ✅ Works on mobile, tablet, and desktop
- ✅ All personal information updated
- ✅ All images replaced with your work
