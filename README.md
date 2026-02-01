# Construction Website

A modern construction company website built with Angular (frontend) and Spring Boot (backend) using PostgreSQL as the database.

## Features

- **Responsive Design**: Mobile-friendly layout with modern UI
- **Project Gallery**: Display construction projects with category filtering
- **Service Pages**: Showcase construction services
- **Contact Form**: Lead generation and customer inquiries
- **About Us**: Company information and team profiles
- **Real-time API Integration**: Full-stack application with REST APIs

## Technology Stack

### Frontend
- Angular 17
- TypeScript
- CSS3 with responsive design
- Font Awesome icons
- Google Fonts

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Maven

### Database
- PostgreSQL 15

## Project Structure

```
construction-website/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/construction/constructionwebsite/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity classes
│   │       └── repository/  # JPA repositories
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/               # Angular application
│   ├── src/app/
│   │   ├── components/     # Angular components
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # PostgreSQL only
├── docker-compose-full.yml # Full application stack
└── README.md
```

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.6+

### Option 1: Using Docker (Recommended)

1. **Start PostgreSQL only:**
   ```bash
   docker-compose up -d
   ```

2. **Start the full application:**
   ```bash
   docker-compose -f docker-compose-full.yml up
   ```

### Option 2: Manual Setup

1. **Start PostgreSQL:**
   ```bash
   docker-compose up -d postgres
   ```

2. **Run Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Run Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Access the Application

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080
- API Endpoints:
  - GET /api/projects - Get all projects
  - GET /api/services - Get all services
  - POST /api/contact - Submit contact form

## Database Schema

### Projects Table
- id (Primary Key)
- title
- description
- image_url
- category
- completion_date

### Services Table
- id (Primary Key)
- title
- description
- icon_url

## API Documentation

### Projects API
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/category/{category}` - Filter projects by category
- `POST /api/projects` - Create new project

### Services API
- `GET /api/services` - Retrieve all services
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services` - Create new service

### Contact API
- `POST /api/contact` - Submit contact form

## Development

### Adding New Projects

Projects are automatically populated when the application starts. You can add more projects by:

1. Using the API endpoint: `POST /api/projects`
2. Adding them directly to the `DataInitializer.java` file

### Customization

- **Styling**: Modify CSS files in `frontend/src/app/`
- **Components**: Angular components are in `frontend/src/app/`
- **APIs**: Spring Boot controllers are in `backend/src/main/java/com/construction/constructionwebsite/controller/`

## Production Deployment

### Backend Deployment Options
1. **Heroku**: Use the provided Dockerfile
2. **Railway**: Deploy via GitHub integration
3. **AWS/Azure**: Deploy as container or VM

### Frontend Deployment Options
1. **Netlify**: Static site hosting
2. **Vercel**: Angular deployment
3. **GitHub Pages**: Free static hosting
4. **AWS S3 + CloudFront**: Scalable hosting

### Database Hosting
1. **Railway**: Free PostgreSQL tier
2. **Heroku Postgres**: Managed PostgreSQL
3. **AWS RDS**: Scalable database service
4. **Neon**: Serverless PostgreSQL

## License

This project is open source and available under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.