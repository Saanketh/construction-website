# How to Run the Construction Website (No Docker Required)

Since Docker is not available, here are alternative ways to run the application:

## Option 1: Run with H2 Database (Easiest)

### Backend Setup
```bash
cd construction-website/backend
mvn spring-boot:run
```

The backend will use an in-memory H2 database by default.

### Frontend Setup
```bash
cd construction-website/frontend
npm install
npm start
```

## Option 2: Run with PostgreSQL (Requires PostgreSQL Installation)

### Install PostgreSQL
- Windows: Download from https://postgresql.org/download/windows/
- macOS: `brew install postgresql`
- Linux: `sudo apt-get install postgresql postgresql-contrib`

### Database Setup
```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE construction_db;
CREATE USER construction_user WITH PASSWORD 'construction_pass';
GRANT ALL PRIVILEGES ON DATABASE construction_db TO construction_user;
```

### Update Backend Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/construction_db
spring.datasource.username=construction_user
spring.datasource.password=construction_pass
```

### Run Application
```bash
# Backend
cd construction-website/backend
mvn spring-boot:run

# Frontend (in another terminal)
cd construction-website/frontend
npm start
```

## Option 3: Use Online PostgreSQL (Free)

### Supabase Setup
1. Go to https://supabase.com
2. Create account and new project
3. Get connection string from Settings > Database
4. Update `application.properties` with your Supabase credentials

## Access Points
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080
- API Endpoints:
  - GET http://localhost:8080/api/projects
  - GET http://localhost:8080/api/services
  - POST http://localhost:8080/api/contact

## Troubleshooting

### Backend Issues
- Check Java version: `java -version` (should be 17+)
- Check Maven: `mvn -version`
- Check port 8080 is not in use

### Frontend Issues
- Check Node.js version: `node -v` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 4200 is not in use

### Database Issues
- If using H2: No setup required, works out of the box
- If using PostgreSQL: Ensure database exists and credentials are correct

## Features Available
- ✅ Home page with hero section
- ✅ About us with company info
- ✅ Services listing
- ✅ Projects gallery with filtering
- ✅ Contact form (functional with backend)
- ✅ Responsive design
- ✅ Modern UI/UX

## Production Deployment
Once running locally, you can deploy to:
- Frontend: Vercel, Netlify, GitHub Pages (free)
- Backend: Railway, Render, Heroku (free tiers available)
- Database: Supabase, Neon (free PostgreSQL)