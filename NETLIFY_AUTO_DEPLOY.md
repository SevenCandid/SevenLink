# Netlify Auto-Deploy from GitHub - Step by Step Guide

Yes! Netlify can automatically deploy your site whenever you push to GitHub. Here's how to set it up:

## 🚀 Step-by-Step Setup

### Step 1: Complete Your Current Git Merge (if needed)

You're currently in the middle of a merge. Complete it first:

```bash
# Commit the merge
git commit -m "Merge completed"

# Add your new files
git add .
git commit -m "Add modern footer, deployment configs, and Smart Home Dashboard project"
```

### Step 2: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Check if you have a remote repository
git remote -v

# If no remote exists, add one:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Don't have a GitHub repository yet?**
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it (e.g., `sevenlink-website`)
4. Don't initialize with README (you already have files)
5. Copy the repository URL
6. Use it in the `git remote add` command above

### Step 3: Connect Netlify to GitHub

1. **Go to [Netlify Dashboard](https://app.netlify.com)**
   - Sign up or log in (you can use your GitHub account)

2. **Click "Add new site" → "Import an existing project"**

3. **Choose "Deploy with GitHub"**
   - You'll be asked to authorize Netlify to access your GitHub account
   - Click "Authorize Netlify"

4. **Select your repository**
   - Find `sevenlink-website` (or your repo name)
   - Click on it

### Step 4: Configure Build Settings

Netlify will auto-detect your settings, but verify:

- **Branch to deploy**: `main` (or `master`)
- **Build command**: (leave empty - static site)
- **Publish directory**: `./` (current directory)

**Click "Deploy site"**

### Step 5: Wait for Deployment

Netlify will:
1. Clone your repository
2. Build your site (instant for static sites)
3. Deploy it
4. Give you a URL like: `https://random-name-123456.netlify.app`

## ✅ That's It! Auto-Deploy is Now Active

### What Happens Next:

**Every time you push to GitHub:**
- Netlify automatically detects the push
- Starts a new deployment
- Builds and deploys your site
- Updates your live site automatically

**For Pull Requests:**
- Netlify creates a preview deployment
- You get a unique URL to preview changes
- Perfect for testing before merging

## 🎯 Netlify Auto-Deploy Features

### Automatic Deployments
- ✅ **Push to `main` branch** → Production deployment
- ✅ **Push to other branches** → Branch preview deployment
- ✅ **Open Pull Request** → Preview deployment with unique URL
- ✅ **Merge Pull Request** → Production deployment

### Deployment Notifications
- Get notified via email when deployments complete
- Get notified if deployments fail
- See deployment status in GitHub PR comments

### Deployment Controls
- **Deploy only specific branches**: Settings → Build & deploy → Branch deploys
- **Stop auto-deploy**: Settings → Build & deploy → Stop auto publishing
- **Deploy previews**: Automatically enabled for PRs

## 🔧 Advanced Configuration

### Deploy Only on Specific Branches

Edit `netlify.toml`:

```toml
[build]
  publish = "."

# Only deploy main branch to production
[context.production]
  command = "echo 'Deploying production'"

# Deploy other branches as previews
[context.branch-deploy]
  command = "echo 'Deploying branch preview'"
```

### Environment Variables

If you need environment variables:
1. Go to Site Settings → Environment variables
2. Add your variables
3. They'll be available during build

### Custom Build Commands

If you need to run commands before deployment:

```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"
```

(Not needed for your static site)

## 📊 Monitoring Deployments

### View Deployment History
- Go to your site dashboard
- Click "Deploys" tab
- See all deployments with:
  - Status (success/failed)
  - Commit message
  - Deploy time
  - Deploy log

### Rollback to Previous Version
1. Go to Deploys tab
2. Find the deployment you want
3. Click "..." menu
4. Select "Publish deploy"

## 🎨 Custom Domain

After deployment, add your custom domain:

1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions
5. Netlify provides free SSL automatically

## 🔔 Deployment Notifications

Set up notifications:
1. Site Settings → Build & deploy → Deploy notifications
2. Choose:
   - Email notifications
   - Slack notifications
   - GitHub commit status

## 🐛 Troubleshooting

### Deployment Fails
- Check the deploy log in Netlify dashboard
- Common issues:
  - Build command errors
  - Missing files
  - Incorrect publish directory

### Changes Not Deploying
- Make sure you pushed to the correct branch
- Check if auto-deploy is enabled
- Verify GitHub connection is active

### Need to Redeploy
- Go to Deploys tab
- Click "Trigger deploy" → "Deploy site"

## 💡 Pro Tips

1. **Use branch previews** to test changes before merging
2. **Check deploy logs** if something goes wrong
3. **Set up notifications** to know when deployments complete
4. **Use environment variables** for sensitive data
5. **Enable form handling** for your contact form (Netlify Forms)

---

## 🎉 Summary

**Yes, Netlify auto-deploys from GitHub!**

Just:
1. Push your code to GitHub
2. Connect Netlify to your GitHub repo
3. Configure build settings
4. Deploy!

Every push = automatic deployment! 🚀

