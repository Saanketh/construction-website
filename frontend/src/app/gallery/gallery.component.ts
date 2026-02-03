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
    { id: 1, url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', title: 'Modern Living Space', category: 'living-room' },
    { id: 2, url: 'https://images.unsplash.com/photo-1616594039964-40891a909d99?w=800', title: 'Master Bedroom Suite', category: 'bedroom' },
    { id: 3, url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800', title: 'Contemporary Kitchen', category: 'kitchen' },
    { id: 4, url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800', title: 'Luxury Bathroom', category: 'bathroom' },
    { id: 5, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Office Reception', category: 'commercial' },
    { id: 6, url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', title: 'Cozy Living Area', category: 'living-room' },
    { id: 7, url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', title: 'Guest Bedroom', category: 'bedroom' },
    { id: 8, url: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800', title: 'Open Kitchen Design', category: 'kitchen' },
    { id: 9, url: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=800', title: 'Modern Bathroom', category: 'bathroom' },
    { id: 10, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', title: 'Retail Space', category: 'commercial' },
    { id: 11, url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=800', title: 'Entertainment Room', category: 'living-room' },
    { id: 12, url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800', title: 'Kids Bedroom', category: 'bedroom' },
    { id: 13, url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800', title: 'Modular Kitchen', category: 'kitchen' },
    { id: 14, url: 'https://images.unsplash.com/photo-1620626012053-1a8bc7c3f807?w=800', title: 'Spa Bathroom', category: 'bathroom' },
    { id: 15, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', title: 'Restaurant Interior', category: 'commercial' }
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
