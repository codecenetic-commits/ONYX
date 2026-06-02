# Deployment Guide

## 🚀 Deployment Options

### Recommended: Vercel (Easiest)
Vercel is the official Next.js hosting platform with automatic optimizations.

#### Quick Start
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Environment Variables
1. Go to Vercel Dashboard
2. Select project
3. Settings → Environment Variables
4. Add your variables:
   - `NEXT_PUBLIC_SITE_URL` = https://onyx-watches.com
   - `NEXT_PUBLIC_SITE_NAME` = ONYX
   - `NEXT_PUBLIC_ENABLE_CSP` = true

#### Features
- ✅ Automatic image optimization
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Built-in analytics
- ✅ Git integration
- ✅ Preview deployments
- ✅ One-click rollback

---

### Alternative: Netlify
Good alternative for static/hybrid deployments.

#### Deploy Steps
1. Connect GitHub to Netlify
2. Select repository
3. Build command: `npm run build`
4. Publish directory: `.next/public`
5. Deploy site

#### Configuration
- Uses `netlify.toml` for config
- Environment variables in UI
- Continuous deployment from Git

---

### Alternative: Self-Hosted (Docker)

#### Prerequisites
- Docker installed
- Node.js 18+
- Git

#### Build & Deploy
```bash
# Build Docker image
docker build -t onyx-watches .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  onyx-watches

# Access at http://localhost:3000
```

#### Production Deployment
```bash
# Use Docker Compose
docker-compose up -d

# Push to registry
docker tag onyx-watches:latest registry.example.com/onyx-watches:latest
docker push registry.example.com/onyx-watches:latest

# Deploy to cloud
# Use Docker Swarm, Kubernetes, or cloud provider
```

---

### Alternative: AWS (EC2, ECS, or Amplify)

#### AWS Amplify
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy
amplify publish
```

#### AWS EC2
```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance-ip

# Clone and deploy
git clone https://github.com/yourusername/onyx-watches.git
cd onyx-watches
npm install
npm run build
npm start
```

---

### Alternative: Google Cloud (Cloud Run)

#### Deploy Command
```bash
# Build and deploy
gcloud run deploy onyx-watches \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

### Alternative: Render
Simple cloud hosting with automatic deployments.

#### Setup
1. Push code to GitHub
2. Connect to Render
3. Create new web service
4. Build command: `npm run build`
5. Start command: `npm start`
6. Deploy

---

## 📋 Pre-Deployment Checklist

### Code Quality
- ✅ Run `npm run type-check` (no errors)
- ✅ Run `npm run lint` (no errors)
- ✅ Run `npm run build` (successful)
- ✅ Run `npm run start` and test locally

### Environment Configuration
- ✅ Create `.env.local` with all variables
- ✅ Test with production values
- ✅ Never commit `.env` files
- ✅ Use `.env.example` for template

### Performance & SEO
- ✅ Lighthouse score 95+ (desktop)
- ✅ Lighthouse score 90+ (mobile)
- ✅ No console errors or warnings
- ✅ All images optimized
- ✅ Meta tags correct

### Accessibility & Testing
- ✅ Accessibility score 95+
- ✅ Keyboard navigation works
- ✅ Screen reader tested
- ✅ Mobile responsive verified
- ✅ All links working

### Security
- ✅ No secrets in code
- ✅ Security headers configured
- ✅ SSL/TLS enabled
- ✅ Dependencies audited
- ✅ Forms validated

### Analytics & Monitoring
- ✅ Analytics configured
- ✅ Error tracking ready
- ✅ Performance monitoring active
- ✅ Uptime monitoring set
- ✅ Alerts configured

---

## 🔧 Deployment Scripts

### Build for Production
```bash
npm run build
```

### Preview Build Locally
```bash
npm run build
npm start
```

### Full Production Check
```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Build
npm run build

# Start server
npm start
```

---

## 📊 Post-Deployment

### Verification
1. Visit deployed URL
2. Check Lighthouse score
3. Test all functionality
4. Verify analytics
5. Check error logs

### Monitoring
```bash
# Monitor build time
# Monitor performance metrics
# Monitor error rates
# Monitor uptime
# Monitor user experience
```

### Rollback
```bash
# Vercel: Automatic rollback available
vercel rollback

# GitHub: Revert commit
git revert <commit-hash>
git push

# Docker: Redeploy previous image
docker run previous-image-tag
```

---

## 🌍 Custom Domain Setup

### DNS Configuration

#### Vercel
1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add custom domain
4. Update DNS records:
   - `A` record to `76.76.19.21`
   - Or `CNAME` record to `cname.vercel-dns.com`

#### Netlify
1. Site settings → Domain management
2. Add custom domain
3. Update DNS records provided

#### Other Hosts
Typically requires:
- `A` record pointing to IP
- `MX` records for email
- `TXT` record for verification

---

## 🔐 SSL/TLS Certificate

### Automatic (Recommended)
- Vercel: Automatic
- Netlify: Automatic
- AWS: AWS Certificate Manager
- Google Cloud: Automatic

### Manual
```bash
# Let's Encrypt (free)
sudo apt-get install certbot
sudo certbot certonly --standalone -d yourdomain.com

# Configure nginx/apache with certificate
```

---

## 📈 Performance Optimization

### CDN Configuration
- Enable caching for static assets
- Set cache headers
- Use edge locations
- Compress responses

### Image Optimization
- Use WebP format
- Responsive sizing
- Lazy loading
- Progressive enhancement

### Monitoring
```
Monitor:
- Load time
- Performance score
- Error rates
- User metrics
- Conversion rates
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Performance Issues
```bash
# Analyze bundle
npm run build -- --analyze

# Check images
# Check CSS/JS size
# Check API calls
```

### Deployment Stuck
```bash
# Check logs
vercel logs

# Check build status
# Restart deployment
# Check dependencies
```

---

## 📞 Support

### Resources
- Vercel Support: support.vercel.com
- Netlify Support: community.netlify.com
- Next.js Docs: nextjs.org/docs
- GitHub Issues: github.com/yourusername/onyx-watches/issues

### Contact
- Email: support@onyx-watches.com
- Website: https://onyx-watches.com

---

**Deployment Status:** ✅ Ready for Production

Last Updated: May 2026
