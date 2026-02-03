To use your own images on the website:

1. **For Founder Photo (Sahithya Rao):**
   - Save your photo as: `frontend/src/assets/images/about/founder.jpg`
   - Recommended size: 400x500 pixels (portrait orientation)

2. **For Project Photos:**
   - Save to: `frontend/src/assets/images/projects/`
   - Name them: project1.jpg, project2.jpg, project3.jpg, etc.
   - Recommended size: 1200x800 pixels

3. **For Gallery Interior Photos:**
   - Save to: `frontend/src/assets/images/gallery/`
   - Any naming is fine

4. **After adding images:**
   - Update the URLs in `frontend/src/app/services/data.service.ts`
   - Change from external URLs to: `assets/images/folder/filename.jpg`
   - Rebuild: `npm run build:prod`
   - Deploy: `git add . && git commit -m "Add custom images" && git push origin main`

**Current Setup:**
All images are currently using external URLs from Unsplash. To use your own:
1. Add the image files to the appropriate folders
2. Update the references in data.service.ts and about.component.html
3. Rebuild and deploy

**Quick Alternative:**
If you have images hosted online (Google Drive, Dropbox, etc.), you can use those direct URLs instead of local assets.