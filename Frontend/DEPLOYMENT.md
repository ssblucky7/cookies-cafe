# Deployment Guide - Cookies Café Frontend

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

#### Why Vercel?
- Free tier available
- Automatic deployments
- Built-in CDN
- Perfect for React/Vite apps
- Zero configuration

#### Steps:
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd frontend
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **cookies-cafe**
   - Directory? **.**
   - Override settings? **N**

5. Production deployment:
```bash
vercel --prod
```

#### Custom Domain (Optional):
```bash
vercel domains add yourdomain.com
```

---

### Option 2: Netlify

#### Steps:
1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Login:
```bash
netlify login
```

4. Deploy:
```bash
netlify deploy
```

5. For production:
```bash
netlify deploy --prod
```

#### Or use Netlify UI:
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Done!

#### Configuration File:
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

#### Steps:
1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/cookies-cafe",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/cookies-cafe/',
  server: {
    port: 3000
  }
})
```

4. Deploy:
```bash
npm run deploy
```

---

### Option 4: AWS S3 + CloudFront

#### Prerequisites:
- AWS Account
- AWS CLI installed

#### Steps:
1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://cookies-cafe-frontend
```

3. Upload files:
```bash
aws s3 sync dist/ s3://cookies-cafe-frontend
```

4. Enable static website hosting:
```bash
aws s3 website s3://cookies-cafe-frontend --index-document index.html --error-document index.html
```

5. Set bucket policy for public access:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cookies-cafe-frontend/*"
    }
  ]
}
```

6. (Optional) Set up CloudFront for CDN

---

### Option 5: Firebase Hosting

#### Steps:
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

4. Configuration:
   - Public directory: **dist**
   - Single-page app: **Yes**
   - GitHub deploys: **No** (or Yes if you want)

5. Build and deploy:
```bash
npm run build
firebase deploy
```

#### firebase.json:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### Option 6: Docker

#### Dockerfile:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build and run:
```bash
docker build -t cookies-cafe-frontend .
docker run -p 80:80 cookies-cafe-frontend
```

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Create `.env.production` file
- [ ] Set API URLs
- [ ] Configure API keys
- [ ] Set analytics IDs

### 2. Build Optimization
- [ ] Run `npm run build`
- [ ] Check build size
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all routes work
- [ ] Test on different devices

### 3. SEO & Meta Tags
- [ ] Update meta descriptions
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Set up Google Analytics

### 4. Performance
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN
- [ ] Configure caching
- [ ] Test loading speed

### 5. Security
- [ ] Remove console.logs
- [ ] Hide API keys
- [ ] Set up HTTPS
- [ ] Configure CORS
- [ ] Add security headers

---

## 📊 Post-Deployment

### Testing
1. Test all pages:
   - [ ] Home page
   - [ ] Menu listing
   - [ ] Product details
   - [ ] All navigation links

2. Test functionality:
   - [ ] Sorting works
   - [ ] Filtering works
   - [ ] Image zoom works
   - [ ] Forms submit
   - [ ] Links work

3. Test devices:
   - [ ] Mobile phone
   - [ ] Tablet
   - [ ] Desktop
   - [ ] Different browsers

### Monitoring
- Set up error tracking (Sentry)
- Configure analytics (Google Analytics)
- Monitor performance (Lighthouse)
- Track user behavior

### Maintenance
- Regular dependency updates
- Security patches
- Content updates
- Performance optimization

---

## 🌐 Custom Domain Setup

### Vercel:
```bash
vercel domains add cookiescafe.com
```

### Netlify:
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

### DNS Configuration:
```
Type    Name    Value
A       @       Your-IP-Address
CNAME   www     your-site.vercel.app
```

---

## 🔄 CI/CD Setup

### GitHub Actions (Example):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📈 Performance Tips

1. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Use CDN for images

2. **Code Splitting**
   - Already handled by Vite
   - Lazy load routes if needed

3. **Caching**
   - Set cache headers
   - Use service workers
   - Implement PWA features

4. **CDN**
   - Use Cloudflare
   - Enable compression
   - Set up edge caching

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Routes Don't Work
- Ensure server redirects all routes to index.html
- Check base URL in vite.config.js

### Images Not Loading
- Check image URLs
- Verify CORS settings
- Use relative paths

### Slow Loading
- Optimize images
- Enable compression
- Use CDN
- Check bundle size

---

## 📞 Support Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [AWS S3 Hosting](https://docs.aws.amazon.com/s3/index.html)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## ✅ Quick Deploy Commands

### Vercel:
```bash
vercel --prod
```

### Netlify:
```bash
netlify deploy --prod
```

### GitHub Pages:
```bash
npm run deploy
```

### Firebase:
```bash
firebase deploy
```

---

**Choose the platform that best fits your needs and budget!** 🚀

For most cases, **Vercel** or **Netlify** are the easiest and most cost-effective options.
