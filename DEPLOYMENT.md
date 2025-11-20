# Deployment Guide for SevenLink Website

This guide will help you deploy your SevenLink website to Vercel or Netlify.

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your site**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (e.g., `sevenlink-website`)
   - Directory? **./** (current directory)
   - Override settings? **No**

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration (Recommended for Continuous Deployment)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/sevenlink-website.git
   git push -u origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure the project**:
   - Framework Preset: **Other**
   - Root Directory: **./** (leave as default)
   - Build Command: (leave empty - static site)
   - Output Directory: **./** (leave as default)

6. **Click "Deploy"**

7. **Your site will be live!** Vercel will provide you with a URL like:
   `https://sevenlink-website.vercel.app`

### Vercel Features:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Custom domain support
- ✅ Free SSL certificates

---

## 🌐 Deploy to Netlify

### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy your site**:
   ```bash
   netlify deploy
   ```
   
   For production:
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard (Drag & Drop)

1. **Go to [Netlify Drop](https://app.netlify.com/drop)**

2. **Drag and drop your project folder** (or zip it first)

3. **Your site will be live instantly!**

### Option 3: Deploy via GitHub Integration

1. **Push your code to GitHub** (same as Vercel steps above)

2. **Go to [Netlify Dashboard](https://app.netlify.com)**

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to GitHub** and select your repository

5. **Configure build settings**:
   - Build command: (leave empty)
   - Publish directory: **./** (current directory)

6. **Click "Deploy site"**

### Netlify Features:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Custom domain support
- ✅ Free SSL certificates
- ✅ Form handling (useful for your contact form)

---

## 📝 Important Notes

### PHP Files
⚠️ **Note**: Your `sendMail.php` file will **NOT work** on Vercel or Netlify because they don't support PHP server-side execution.

**Solutions:**
1. **Use a third-party service** like:
   - [Formspree](https://formspree.io/)
   - [EmailJS](https://www.emailjs.com/)
   - [Netlify Forms](https://www.netlify.com/products/forms/) (if using Netlify)

2. **Convert to a serverless function**:
   - Vercel: Create a serverless function in `/api/sendmail.js`
   - Netlify: Create a serverless function in `/netlify/functions/sendmail.js`

### Custom Domain

Both platforms support custom domains:
- **Vercel**: Go to Project Settings → Domains
- **Netlify**: Go to Site Settings → Domain Management

---

## 🔄 Continuous Deployment

Once connected to GitHub, both platforms will automatically:
- Deploy when you push to `main` branch
- Create preview deployments for pull requests
- Rollback to previous versions if needed

---

## 📊 Which Platform to Choose?

**Choose Vercel if:**
- You want the fastest deployment
- You prefer a modern developer experience
- You might add serverless functions later

**Choose Netlify if:**
- You need form handling (built-in)
- You prefer drag-and-drop deployment
- You want more free features

Both are excellent choices! 🎉

