# Testing & Quality Assurance Guide

## 🎯 QA Checklist

### ✅ Functionality Testing

#### Navigation
- [ ] All menu items link to correct sections
- [ ] Mobile menu opens/closes properly
- [ ] Mobile menu closes on item click
- [ ] Mobile menu closes on Escape key
- [ ] All links are clickable
- [ ] Skip to main content link works

#### Interactions
- [ ] All buttons are clickable
- [ ] Hover states work
- [ ] Click states work
- [ ] Form fields are interactive
- [ ] All CTAs functional
- [ ] No broken links

#### Sections
- [ ] All sections display correctly
- [ ] Content is readable
- [ ] Images load properly
- [ ] Videos play correctly
- [ ] Animations smooth
- [ ] No layout shifts

### ✅ Responsive Testing

#### Mobile (320px - 480px)
- [ ] Layout reflows correctly
- [ ] Touch targets are 48px+
- [ ] No horizontal scrolling
- [ ] Text is readable
- [ ] Images responsive
- [ ] Navigation accessible

#### Tablet (768px - 1024px)
- [ ] Layout adapts properly
- [ ] Multi-column layouts work
- [ ] Touch friendly
- [ ] All content visible
- [ ] Spacing appropriate
- [ ] Readability maintained

#### Desktop (1024px+)
- [ ] Full layout displays
- [ ] Hover effects work
- [ ] Desktop menu visible
- [ ] All content visible
- [ ] Spacing optimal
- [ ] Performance good

#### Ultra-wide (1920px+)
- [ ] Content doesn't stretch too wide
- [ ] Max-width applied
- [ ] Readable content width
- [ ] Layout balanced
- [ ] Images not pixelated

### ✅ Browser Compatibility

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Firefox Mobile
- [ ] Samsung Internet

#### Older Versions
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### ✅ Performance Testing

#### Lighthouse Score
- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

#### Core Web Vitals
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1

#### Load Testing
- [ ] Page loads in < 3s
- [ ] Interactive in < 5s
- [ ] No jank during scroll
- [ ] Smooth animations

### ✅ Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all elements
- [ ] Tab order is logical
- [ ] Focus always visible
- [ ] Escape closes menus
- [ ] Enter activates buttons

#### Screen Reader
- [ ] All text readable
- [ ] Images have alt text
- [ ] Headings navigate properly
- [ ] Form labels present
- [ ] Links descriptive

#### Visual
- [ ] Contrast 4.5:1+ (AA)
- [ ] No color-only info
- [ ] Focus visible
- [ ] Text resizable
- [ ] No flashing content

#### Motion
- [ ] prefers-reduced-motion respected
- [ ] No auto-play video with sound
- [ ] Animations not disruptive
- [ ] Smooth scrolling
- [ ] No motion sickness risk

### ✅ SEO Testing

#### Meta Tags
- [ ] Title tag present and descriptive
- [ ] Meta description present
- [ ] Viewport meta tag correct
- [ ] Language attribute set
- [ ] Canonical URL present

#### Structured Data
- [ ] JSON-LD valid
- [ ] Schema.org compatible
- [ ] Rich snippets display

#### Technical SEO
- [ ] Sitemap.xml valid
- [ ] robots.txt correct
- [ ] Robots meta tags
- [ ] Internal links valid
- [ ] URLs SEO-friendly

### ✅ Security Testing

#### Headers
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-XSS-Protection present
- [ ] CSP headers set
- [ ] HTTPS enforced

#### Forms
- [ ] Input validation
- [ ] No XSS vulnerabilities
- [ ] No SQL injection risk
- [ ] CSRF protection
- [ ] Secure submission

#### Dependencies
- [ ] No known vulnerabilities
- [ ] All dependencies up-to-date
- [ ] Audit passes
- [ ] No malicious packages

### ✅ Content Testing

#### Copy & Messaging
- [ ] No typos
- [ ] Grammar correct
- [ ] Professional tone
- [ ] Clear messaging
- [ ] Calls-to-action clear

#### Images
- [ ] All images present
- [ ] Images optimized
- [ ] No broken images
- [ ] Alt text present
- [ ] Proper sizing

#### Videos
- [ ] Videos play
- [ ] Captions present
- [ ] Controls visible
- [ ] No auto-play with sound
- [ ] Mobile playback works

### ✅ Cross-browser Testing

#### Rendering
- [ ] Layout identical (allow 1-2px variance)
- [ ] Colors consistent
- [ ] Fonts rendering
- [ ] Shadows rendering
- [ ] Gradients displaying

#### Interactions
- [ ] Hover effects work
- [ ] Click handlers fire
- [ ] Transitions smooth
- [ ] Animations play
- [ ] Input responsive

#### Features
- [ ] LocalStorage works
- [ ] Timers function
- [ ] Scroll events fire
- [ ] Resize events fire
- [ ] Touch events register

---

## 🧪 Testing Commands

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Format Check
```bash
npm run format:check
npm run format
```

### Build
```bash
npm run build
```

### Production Preview
```bash
npm run build
npm start
```

### Full QA Suite
```bash
# Run all checks
npm run type-check && npm run lint && npm run build
```

---

## 📊 Lighthouse Audits

### Desktop Audit
1. Open Chrome DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Desktop"
4. Click "Generate report"
5. Review results

### Mobile Audit
1. Open Chrome DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Mobile"
4. Click "Generate report"
5. Review results

### Core Web Vitals
Use PageSpeed Insights: https://pagespeed.web.dev

---

## 📱 Mobile Testing

### Chrome DevTools
1. Press F12
2. Click device toolbar icon
3. Select device or custom size
4. Test responsiveness

### Real Devices
- Test on actual phones/tablets
- Test on 4G/5G networks
- Test on various OS versions
- Test touch interactions

---

## ♿ Accessibility Audit

### Automated Tools
1. **axe DevTools** - Chrome extension
2. **WAVE** - Web Accessibility Evaluation Tool
3. **Lighthouse** - Built-in to Chrome

### Manual Testing
1. Keyboard navigation only
2. Screen reader testing
3. Color contrast verification
4. Focus indicator check

---

## 🔐 Security Testing

### OWASP Top 10
- [ ] Injection prevention
- [ ] Broken authentication
- [ ] Sensitive data exposure
- [ ] XML external entities
- [ ] Broken access control
- [ ] Security misconfiguration
- [ ] XSS prevention
- [ ] Insecure deserialization
- [ ] Using components with vulnerabilities
- [ ] Insufficient logging

### Tools
- npm audit
- OWASP ZAP
- Snyk
- GitHub Security Alerts

---

## 📈 Performance Testing

### Network Throttling
1. Open DevTools
2. Network tab
3. Select throttling profile
4. Test on different speeds

### Profiles
- Fast 3G
- Slow 3G
- Offline
- 4G
- LTE

---

## 🐛 Bug Tracking

### Report Format
```
Title: [Component] Brief description
Severity: Critical/High/Medium/Low
Browser: Chrome 120, Firefox 121, Safari 17
Device: Desktop/Tablet/Mobile (specify model)
Steps to Reproduce:
1. ...
2. ...
3. ...
Expected Result: ...
Actual Result: ...
Screenshot/Video: [if applicable]
```

---

## ✅ Sign-Off Checklist

### Before Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score acceptable
- [ ] Accessibility verified
- [ ] Security audit complete
- [ ] Performance acceptable
- [ ] Content reviewed
- [ ] Links verified
- [ ] Mobile tested
- [ ] Browser compatibility verified

### After Deployment
- [ ] Production build verified
- [ ] All features working
- [ ] Performance acceptable
- [ ] Analytics firing
- [ ] Errors being logged
- [ ] Monitoring active
- [ ] Team notified
- [ ] Documentation updated

---

## 📞 Testing Support

### Issue Tracking
- GitHub Issues
- Jira
- Linear

### Communication
- Email: qa@onyx-watches.com
- Slack: #quality-assurance
- Standup meetings

### Resources
- Testing guidelines
- Browser compatibility matrix
- Device lab access
- Video recordings

---

**Status:** ✅ QA Ready
Last Updated: May 2026
