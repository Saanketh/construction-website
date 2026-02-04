import { Component, OnInit, HostListener } from '@angular/core';
import { DataService, GalleryItem } from '../services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: GalleryItem[] = [];
  loading = true;
  selectedCategory = 'all';
  lightboxOpen = false;
  selectedImage: GalleryItem | null = null;
  currentImageIndex = 0;

  categories = [
    { id: 'all', name: 'All', icon: 'fa-th-large' },
    { id: 'living-room', name: 'Living Room', icon: 'fa-couch' },
    { id: 'bedroom', name: 'Bedroom', icon: 'fa-bed' },
    { id: 'kitchen', name: 'Kitchen', icon: 'fa-utensils' },
    { id: 'bathroom', name: 'Bathroom', icon: 'fa-bath' },
    { id: 'commercial', name: 'Commercial', icon: 'fa-building' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    this.dataService.getGallery().subscribe({
      next: (data) => {
        this.images = data;
        this.loading = false;
      },
      error: () => {
        this.images = [];
        this.loading = false;
      }
    });
  }

  get filteredImages(): GalleryItem[] {
    if (this.selectedCategory === 'all') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openLightbox(image: GalleryItem): void {
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
