# QUICK DEPLOYMENT GUIDE - Free Hosting

## 🚀 Deploy to FREE Platforms (15 minutes)

### Step 1: Deploy Backend to Railway (Free)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Construction website"
git branch -M main
# Create new repo at github.com and get the URL
git remote add origin https://github.com/YOUR_USERNAME/construction-website.git
git push -u origin main
```

2. **Deploy Backend**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Railway will auto-detect Spring Boot
   - Set root directory: `backend`
   - Click "Deploy"

3. **Get Backend URL**
   - Railway gives you a URL like: `https://construction-backend.up.railway.app`

### Step 2: Deploy Frontend to Vercel (Free)

1. **Deploy Frontend**
   - Go to https://vercel.com
   - Click "New Project" → "Import Git Repository"
   - Select your GitHub repo
   - Set root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist/frontend`
   - Click "Deploy"

2. **Set Environment Variable**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `API_URL` = `https://construction-backend.up.railway.app`

### Step 3: Database Setup (Free PostgreSQL)

**Option A: Supabase (Recommended)**
1. Go to https://supabase.com
2. Create account → "New Project"
3. Get database URL from Settings → Database
4. In Railway dashboard → Variables:
   - `SPRING_DATASOURCE_URL` = `your_supabase_url`
   - `SPRING_DATASOURCE_USERNAME` = `postgres`
   - `SPRING_DATASOURCE_PASSWORD` = `your_supabase_password`

**Option B: Railway Built-in Database**
- Railway provides free PostgreSQL automatically!
- Just use Railway's built-in database (no setup needed)

### Step 4: View Your Live Website!

- **Frontend**: `https://construction-website.vercel.app`
- **Backend**: `https://construction-backend.up.railway.app`

## 🎯 ALTERNATIVE: Netlify + Railway

### Deploy to Netlify instead of Vercel:
1. Go to https://netlify.com
2. "Add new site" → "Import existing project"
3. Connect GitHub
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist/frontend`

## 📝 What You'll Have

- **Live Website**: Fully functional construction site
- **Domain**: Free subdomain
- **Database**: Free PostgreSQL
- **No Cost**: 100% free hosting
- **SSL**: HTTPS enabled automatically
- **Custom Domain**: Can add your domain later

## 🔧 Files Already Created

✅ `vercel.json` - Frontend deployment config
✅ `Procfile` - Backend deployment config  
✅ `railway.toml` - Railway configuration
✅ Environment files for production
✅ CORS configuration ready for production

## ⚡ One-Click Deployment (Easier)

### Railway (Backend):
1. Click this link after pushing to GitHub:
   `https://railway.app/new/template?template=https://github.com/YOUR_USERNAME/construction-website`

### Vercel (Frontend):
1. Click this link after pushing to GitHub:
   `https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/construction-website`

## 🎉 You'll Be Live In 15 Minutes!

Your construction website will be accessible worldwide with:
- Modern responsive design
- Working contact form
- Project gallery
- All pages functional
- Free SSL certificate