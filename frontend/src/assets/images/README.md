# Prashansaa Builders - Image Upload Guide

## Folder Structure

All images should be placed in the `frontend/src/assets/images/` directory with the following structure:

```
frontend/src/assets/images/
├── home/
│   └── header.jpg (Hero background image)
├── about/
│   ├── founder.jpg (Sahithya Rao photo)
│   └── team.jpg (Team photo)
├── services/
│   ├── residential.jpg
│   ├── commercial.jpg
│   ├── naksha.jpg
│   └── consultation.jpg
├── projects/
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── project5.jpg
│   └── project6.jpg
├── gallery/
│   ├── interior1.jpg
│   ├── interior2.jpg
│   └── ... (Add more interior design images)
├── blogs/
│   ├── sustainable.jpg
│   ├── regulations.jpg
│   └── interiors.jpg
└── newsletter/
    ├── news1.jpg
    ├── news2.jpg
    └── news3.jpg
```

## Image Requirements

### Founder Photo (about/founder.jpg)
- Upload the photo of Sahithya Rao here
- Recommended size: 400x500 pixels
- Format: JPG or PNG
- Aspect ratio: Portrait (4:5)

### Service Images (services/*.jpg)
Each service needs a representative image:
- Residential: Show a beautiful home/house
- Commercial: Show an office building or commercial space
- Naksha: Show blueprints, permits, or legal documents
- Consultation: Show people in discussion or planning

### Project Images (projects/*.jpg)
Add real project photos for:
- Shankar Nagar projects
- Kamal Vihar projects
- Amlidih projects
- Devendra Nagar projects

### Gallery Images (gallery/*.jpg)
Interior design inspiration images from Pinterest or your own work:
- Living rooms
- Bedrooms
- Kitchens
- Bathrooms
- Commercial interiors

## How to Upload

1. Navigate to the appropriate folder
2. Add your images with the exact filenames listed above
3. Run the build command: `npm run build:prod`
4. Deploy to GitHub Pages

## Image Optimization Tips

- Keep file sizes under 200KB for faster loading
- Use JPG for photos, PNG for graphics with transparency
- Recommended dimensions: 1200x800 pixels for project images
- Compress images using tools like TinyPNG before uploading
