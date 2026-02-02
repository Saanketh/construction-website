#!/bin/bash

# Deploy to GitHub Pages
# This script builds the Angular frontend and deploys it to GitHub Pages

echo "Starting deployment to GitHub Pages..."

# Build the frontend
echo "Building frontend..."
cd frontend
npm run build:prod

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Copy built files to root
echo "Copying built files to root..."
cd ..
rm -f index.html main.*.js polyfills.*.js runtime.*.js styles.*.css
cp -r frontend/dist/frontend/* .

# Add to git
echo "Adding files to git..."
git add index.html main.*.js polyfills.*.js runtime.*.js styles.*.css

# Commit and push
echo "Committing and pushing to GitHub..."
git commit -m "Deploy to GitHub Pages - $(date)"
git push origin main

echo "Deployment complete! Visit https://saanketh.github.io/construction-website/"
