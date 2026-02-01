# Environment Configuration Files for Different Hosting Platforms

## Supabase Database Setup (Free PostgreSQL)

1. **Create Supabase Account**: https://supabase.com
2. **New Project**: Create a new project
3. **Database Details**: 
   - Project URL: from your Supabase dashboard
   - Database Password: set during project creation
   - Connection string: `jdbc://<project-url>:6543/postgres`

## Railway Deployment (Backend)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

4. **Set Environment Variables** in Railway dashboard:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`

## Vercel Deployment (Frontend)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable** for API URL:
   ```bash
   vercel env add API_URL
   ```

## Netlify Alternative (Frontend)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Sign up at https://netlify.com
   - Connect GitHub repository
   - Build command: `cd frontend && npm run build:prod`
   - Publish directory: `frontend/dist/frontend`

## Free Hosting Options Summary

### Backend (Spring Boot + PostgreSQL)
- **Railway**: Free tier with PostgreSQL
- **Heroku**: Free tier ending 2022 (paid now)
- **Render**: Free tier with PostgreSQL
- **Supabase**: Free PostgreSQL + Edge Functions

### Frontend (Angular)
- **Vercel**: Free with custom domains
- **Netlify**: Free with custom domains
- **GitHub Pages**: Free static hosting
- **Firebase Hosting**: Free tier

### Database
- **Supabase**: Free PostgreSQL
- **Neon**: Free PostgreSQL
- **PlanetScale**: Free MySQL
- **MongoDB Atlas**: Free MongoDB

## Production URLs Example

After deployment:
- Frontend: `https://construction-website.vercel.app`
- Backend: `https://construction-backend.up.railway.app`
- Database: `https://<project>.supabase.co`

## CORS Configuration Update

Update your backend CORS configuration to include your deployed frontend URL:

```java
@CrossOrigin(origins = {"http://localhost:4200", "https://construction-website.vercel.app"})
```