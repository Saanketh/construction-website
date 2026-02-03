import { Component, OnInit, HostListener } from '@angular/core';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: GalleryImage[] = [];
  loading = true;
  selectedCategory = 'all';
  lightboxOpen = false;
  selectedImage: GalleryImage | null = null;
  currentImageIndex = 0;

  categories = [
    { id: 'all', name: 'All', icon: 'fa-th-large' },
    { id: 'living-room', name: 'Living Room', icon: 'fa-couch' },
    { id: 'bedroom', name: 'Bedroom', icon: 'fa-bed' },
    { id: 'kitchen', name: 'Kitchen', icon: 'fa-utensils' },
    { id: 'bathroom', name: 'Bathroom', icon: 'fa-bath' },
    { id: 'commercial', name: 'Commercial', icon: 'fa-building' }
  ];

  private galleryData: GalleryImage[] = [
    { id: 1, url: 'assets/images/gallery/living1.jpg', title: 'Modern Living Space', category: 'living-room' },
    { id: 2, url: 'assets/images/gallery/bedroom1.jpg', title: 'Master Bedroom Suite', category: 'bedroom' },
    { id: 3, url: 'assets/images/gallery/kitchen1.jpg', title: 'Contemporary Kitchen', category: 'kitchen' },
    { id: 4, url: 'assets/images/gallery/bath1.jpg', title: 'Luxury Bathroom', category: 'bathroom' },
    { id: 5, url: 'assets/images/gallery/commercial1.jpg', title: 'Office Reception', category: 'commercial' },
    { id: 6, url: 'assets/images/gallery/living2.jpg', title: 'Cozy Living Area', category: 'living-room' },
    { id: 7, url: 'assets/images/gallery/bedroom2.jpg', title: 'Guest Bedroom', category: 'bedroom' },
    { id: 8, url: 'assets/images/gallery/kitchen2.jpg', title: 'Open Kitchen Design', category: 'kitchen' },
    { id: 9, url: 'assets/images/gallery/bath2.jpg', title: 'Modern Bathroom', category: 'bathroom' },
    { id: 10, url: 'assets/images/gallery/commercial2.jpg', title: 'Retail Space', category: 'commercial' },
    { id: 11, url: 'assets/images/gallery/living3.jpg', title: 'Entertainment Room', category: 'living-room' },
    { id: 12, url: 'assets/images/gallery/bedroom3.jpg', title: 'Kids Bedroom', category: 'bedroom' },
    { id: 13, url: 'assets/images/gallery/kitchen3.jpg', title: 'Modular Kitchen', category: 'kitchen' },
    { id: 14, url: 'assets/images/gallery/bath3.jpg', title: 'Spa Bathroom', category: 'bathroom' },
    { id: 15, url: 'assets/images/gallery/commercial3.jpg', title: 'Restaurant Interior', category: 'commercial' }
  ];

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    setTimeout(() => {
      this.images = this.galleryData;
      this.loading = false;
    }, 500);
  }

  get filteredImages(): GalleryImage[] {
    if (this.selectedCategory === 'all') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openLightbox(image: GalleryImage): void {
    this.selectedImage = image;
    this.currentImageIndex = this.filteredImages.findIndex(img => img.id === image.id);
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    const images = this.filteredImages;
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.selectedImage = images[this.currentImageIndex];
  }

  prevImage(): void {
    const images = this.filteredImages;
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
    this.selectedImage = images[this.currentImageIndex];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }
}
