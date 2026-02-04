import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { ContentStoreService, ContentSection, RecycleItem } from '../services/content-store.service';
import { Blog, DataService, GalleryItem, Newsletter, Project, Review, Service } from '../services/data.service';

type AnyItem = any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username = '';
  password = '';
  loginError: string | null = null;

  active: ContentSection = 'projects';
  sections: { id: ContentSection; label: string; icon: string }[] = [
    { id: 'projects', label: 'Projects', icon: 'fa-city' },
    { id: 'services', label: 'Services', icon: 'fa-briefcase' },
    { id: 'blogs', label: 'Blogs', icon: 'fa-pen-nib' },
    { id: 'newsletters', label: 'Newsletter', icon: 'fa-newspaper' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
    { id: 'reviews', label: 'Reviews', icon: 'fa-star' }
  ];

  list: AnyItem[] = [];
  selected: AnyItem | null = null;
  selectedIndex = -1;

  dragIndex: number | null = null;

  recycle: RecycleItem<any>[] = [];
  showRecycle = false;
  recycleImages: { id: string; label: string; imageUrl: string }[] = [];

  constructor(
    public auth: AdminAuthService,
    private store: ContentStoreService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.loadSection(this.active);
  }

  login(): void {
    this.loginError = null;
    const ok = this.auth.login(this.username.trim(), this.password);
    if (!ok) {
      this.loginError = 'Invalid credentials.';
      return;
    }
    this.password = '';
    this.loadSection(this.active);
  }

  logout(): void {
    this.auth.logout();
    this.selected = null;
    this.selectedIndex = -1;
  }

  loadSection(section: ContentSection): void {
    this.active = section;
    this.selected = null;
    this.selectedIndex = -1;
    this.showRecycle = false;

    if (section === 'projects') {
      this.data.getProjects().subscribe(x => (this.list = this.clone(x)));
    } else if (section === 'services') {
      this.data.getServices().subscribe(x => (this.list = this.clone(x)));
    } else if (section === 'blogs') {
      this.data.getBlogs().subscribe(x => (this.list = this.clone(x)));
    } else if (section === 'newsletters') {
      this.data.getNewsletters().subscribe(x => (this.list = this.clone(x)));
    } else if (section === 'gallery') {
      this.data.getGallery().subscribe(x => (this.list = this.clone(x)));
    } else if (section === 'reviews') {
      this.data.getReviews().subscribe(x => (this.list = this.clone(x)));
    }

    this.refreshRecycle();
    this.refreshRecycleImages();
  }

  selectItem(i: number): void {
    this.selectedIndex = i;
    this.selected = this.clone(this.list[i]);
    if (this.active === 'services' && this.selected) {
      // Present steps as editable JSON text.
      (this.selected as any).stepsJson = JSON.stringify((this.selected as any).steps || [], null, 2);
    }
    this.refreshRecycleImages();
  }

  createNew(): void {
    const nextId = this.nextId(this.list);
    let item: AnyItem;

    switch (this.active) {
      case 'projects':
        item = {
          id: nextId,
          title: 'New Project',
          description: '',
          imageUrl: '',
          category: 'Residential',
          location: 'Shankar Nagar',
          status: 'Yet to plan',
          sqft: '',
          completionDate: ''
        } as Project;
        break;
      case 'services':
        item = {
          id: nextId,
          title: 'New Service',
          description: '',
          imageUrl: '',
          icon: 'fa-tools',
          steps: []
        } as Service;
        break;
      case 'blogs':
        item = {
          id: nextId,
          title: 'New Blog Post',
          excerpt: '',
          content: '',
          imageUrl: '',
          author: 'Prashansaa Builders',
          date: new Date().toISOString().slice(0, 10),
          category: 'General'
        } as Blog;
        break;
      case 'newsletters':
        item = {
          id: nextId,
          title: 'New Newsletter',
          subtitle: '',
          content: '',
          imageUrl: '',
          date: new Date().toISOString().slice(0, 10)
        } as Newsletter;
        break;
      case 'gallery':
        item = {
          id: nextId,
          url: '',
          title: 'New Image',
          category: 'living-room'
        } as GalleryItem;
        break;
      case 'reviews':
        item = {
          id: nextId,
          name: 'Client Name',
          location: 'Raipur',
          projectType: 'Residential',
          rating: 5,
          title: 'Great experience',
          message: '',
          date: new Date().toISOString().slice(0, 7)
        } as Review;
        break;
    }

    this.list = [item, ...this.list];
    this.persist();
    this.selectItem(0);
  }

  duplicateSelected(): void {
    if (!this.selected) return;
    const copy = this.clone(this.selected);
    copy.id = this.nextId(this.list);
    this.list = [copy, ...this.list];
    this.persist();
    this.selectItem(0);
  }

  deleteSelected(): void {
    if (this.selectedIndex < 0) return;
    const removed = this.list[this.selectedIndex];
    this.store.addToRecycle(this.active, removed);
    this.list.splice(this.selectedIndex, 1);
    this.list = [...this.list];
    this.persist();
    this.selected = null;
    this.selectedIndex = -1;
    this.refreshRecycle();
    this.refreshRecycleImages();
  }

  saveSelected(): void {
    if (this.selectedIndex < 0 || !this.selected) return;

    if (this.active === 'services') {
      const raw = (this.selected as any).stepsJson;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          (this.selected as any).steps = Array.isArray(parsed) ? parsed : [];
        } catch {
          // If invalid JSON, keep existing steps.
        }
      }
      delete (this.selected as any).stepsJson;
    }

    this.list[this.selectedIndex] = this.clone(this.selected);
    this.list = [...this.list];
    this.persist();
  }

  onDragStart(i: number): void {
    this.dragIndex = i;
  }

  onDrop(i: number): void {
    if (this.dragIndex === null || this.dragIndex === i) return;
    const copy = [...this.list];
    const [moved] = copy.splice(this.dragIndex, 1);
    copy.splice(i, 0, moved);
    this.list = copy;
    this.dragIndex = null;
    this.persist();
  }

  onDragEnd(): void {
    this.dragIndex = null;
  }

  uploadImage(event: Event, field: 'imageUrl' | 'url'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.selected) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      this.selected[field] = result;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  restoreImageFromRecycle(recycleId: string, field: 'imageUrl' | 'url'): void {
    const found = this.recycleImages.find(x => x.id === recycleId);
    if (!found || !this.selected) return;
    this.selected[field] = found.imageUrl;
  }

  onRestoreSelect(event: Event, field: 'imageUrl' | 'url'): void {
    const el = event.target as HTMLSelectElement;
    const id = el.value;
    if (id) {
      this.restoreImageFromRecycle(id, field);
      el.value = '';
    }
  }

  refreshRecycle(): void {
    this.recycle = this.store.getRecycle<any>().filter(x => x.section === this.active);
  }

  refreshRecycleImages(): void {
    this.recycleImages = this.store.listRecycleImages(this.active);
  }

  restoreItem(recycleId: string): void {
    const restored = this.store.restoreFromRecycle<any>(recycleId);
    if (!restored) return;
    this.list = [restored.item, ...this.list];
    this.persist();
    this.refreshRecycle();
  }

  toggleRecycle(): void {
    this.showRecycle = !this.showRecycle;
    this.refreshRecycle();
  }

  private persist(): void {
    // Admin changes are stored locally only (localStorage).
    switch (this.active) {
      case 'projects':
        this.data.saveProjects(this.list as Project[]);
        break;
      case 'services':
        this.data.saveServices(this.list as Service[]);
        break;
      case 'blogs':
        this.data.saveBlogs(this.list as Blog[]);
        break;
      case 'newsletters':
        this.data.saveNewsletters(this.list as Newsletter[]);
        break;
      case 'gallery':
        this.data.saveGallery(this.list as GalleryItem[]);
        break;
      case 'reviews':
        this.data.saveReviews(this.list as Review[]);
        break;
    }
  }

  private clone<T>(x: T): T {
    return JSON.parse(JSON.stringify(x));
  }

  private nextId(list: AnyItem[]): number {
    const max = list.reduce((m, it) => (typeof it?.id === 'number' && it.id > m ? it.id : m), 0);
    return max + 1;
  }
}
