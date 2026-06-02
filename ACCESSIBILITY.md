# Accessibility (A11Y) Guide

## 🎯 Accessibility Standards

This website meets **WCAG 2.1 Level AA** compliance standards.

Target Accessibility Lighthouse Score: **95+**

## ♿ Implemented Features

### 1. Keyboard Navigation

**Tab Navigation**
- All interactive elements are keyboard accessible
- Logical tab order throughout the page
- No keyboard trap

**Keyboard Shortcuts**
- `Tab` - Navigate forward
- `Shift + Tab` - Navigate backward
- `Enter` - Activate buttons and links
- `Space` - Activate buttons/toggle
- `Escape` - Close mobile menu
- `Scroll` - Page scrolling

**Focus Management**
- Clear focus indicators (gold outline)
- Focus always visible
- Focus order follows visual order
- Skip links for main content

### 2. Screen Reader Support

**Semantic HTML**
```html
<header> - Main navigation area
<nav> - Navigation regions
<main> - Main content area
<section> - Content sections
<article> - Individual content blocks
<button> - Interactive buttons
<a> - Links
<form> - Form containers
<label> - Form labels
```

**ARIA Labels**
- `aria-label` - For icon buttons
- `aria-labelledby` - For complex labels
- `aria-describedby` - For descriptions
- `aria-expanded` - For menu states
- `aria-current` - For active pages
- `aria-hidden="true"` - For decorative elements

**Landmark Regions**
- ✅ Header/Banner
- ✅ Navigation
- ✅ Main Content
- ✅ Complementary (sidebars)
- ✅ Footer

### 3. Color and Contrast

**Contrast Ratios (WCAG AA)**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Graphics/UI: 3:1 minimum

**Our Ratios**
- White text on black: 21:1 ✅
- Gold on black: 6.5:1 ✅
- Gray on black: 7:1 ✅

**Testing**
- Use Chrome DevTools color picker
- Use contrast checkers (webaim.org/contrast)
- Test with color blindness simulators

### 4. Motion and Animation

**Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Respects User Preferences**
- Animations can be disabled
- Transitions are smooth
- No auto-playing videos
- No flashing content

### 5. Mobile & Touch

**Touch Targets**
- Minimum 48x48 pixels (48x48 recommended)
- 8px spacing between targets
- Touch-friendly on all devices

**Mobile Accessibility**
- Responsive design
- Pinch-to-zoom enabled
- Readable text sizes
- Adequate spacing

### 6. Forms and Inputs

**Form Accessibility**
```html
<label for="input-id">Label Text</label>
<input id="input-id" type="text" />
```

**Features**
- All inputs have associated labels
- Error messages are clear
- Required fields are marked
- Placeholder text is not label replacement
- Form validation is accessible

### 7. Images

**Alt Text**
- Decorative images: `alt=""` or `aria-hidden="true"`
- Informative images: descriptive alt text
- Complex images: longer description nearby
- Avoid "image of" or "picture of"

**Best Practices**
```html
<!-- Good -->
<img src="watch.jpg" alt="ONYX ceramic watch with leather strap" />

<!-- Bad -->
<img src="watch.jpg" alt="image of watch" />
<img src="watch.jpg" /> <!-- No alt text -->
```

### 8. Video and Audio

**Captions**
- Videos must have captions
- Audio content needs transcripts
- Captions should be accurate and complete

**Controls**
- Play/pause buttons must be accessible
- Volume controls included
- No auto-play with sound

## 🧪 Testing & Validation

### Automated Testing

**Chrome DevTools**
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select Accessibility
4. Click "Analyze page load"
5. Review results
```

**Browser Extensions**
- axe DevTools
- WAVE WebAIM
- Lighthouse
- NVDA Screen Reader

### Manual Testing

**Keyboard Navigation**
1. Tab through entire page
2. Check focus is always visible
3. Verify tab order is logical
4. Test Escape key closes menus
5. Test Enter activates buttons

**Screen Reader Testing**
1. Use NVDA (Windows) or JAWS
2. Navigate with screen reader
3. Verify all content is readable
4. Check form labels are announced
5. Verify skip links work

**Mobile Testing**
1. Test with screen readers
2. Test touch target sizes
3. Verify zoom is possible
4. Check landscape mode works
5. Test on multiple devices

### Accessibility Checklist

#### Content
- ✅ Page title is descriptive
- ✅ Page language is declared (lang="en")
- ✅ Headings are properly nested
- ✅ Text is clear and simple
- ✅ Lists are marked semantically

#### Interactive Elements
- ✅ Buttons have visible text or labels
- ✅ Links describe their purpose
- ✅ Focus indicators are visible
- ✅ Interactive elements are reachable via keyboard
- ✅ Form fields are properly labeled

#### Images and Media
- ✅ Images have meaningful alt text
- ✅ Decorative images have alt=""
- ✅ Videos have captions
- ✅ Audio has transcripts
- ✅ Icons have labels

#### Colors and Contrast
- ✅ Contrast ratio is 4.5:1 or higher
- ✅ No information is conveyed by color alone
- ✅ Links are distinguishable from text
- ✅ Text is readable against background
- ✅ Focus indicators are clear

#### Motion
- ✅ prefers-reduced-motion is respected
- ✅ No auto-playing videos with sound
- ✅ No flashing content (> 3 flashes/second)
- ✅ Animations don't distract from content
- ✅ GIFs are controlled by user

#### Responsive Design
- ✅ Page is readable at 200% zoom
- ✅ Page is readable at 320px width
- ✅ Text reflows without horizontal scrolling
- ✅ Touch targets are at least 48x48px
- ✅ Content doesn't require a specific orientation

## 📚 Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### Testing
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Accessibility Insights](https://accessibilityinsights.io/)

## 🎓 Learning

### Key Concepts
1. **Perceivable** - Information must be perceivable
2. **Operable** - Must be operable via keyboard
3. **Understandable** - Content must be understandable
4. **Robust** - Must work with assistive technologies

### Common Issues
1. Missing alt text on images
2. Poor color contrast
3. Keyboard navigation broken
4. Form labels missing
5. Heading hierarchy incorrect

## ✅ Compliance

**WCAG 2.1 Level AA**
- 78 success criteria
- 2 levels: A (basic) and AA (enhanced)
- We target Level AA (industry standard)

**Legal Requirements**
- ADA Compliance (USA)
- AODA Compliance (Canada)
- EN 301 549 (European Union)
- Various country-specific laws

---

For questions about accessibility, please contact support@onyx-watches.com
