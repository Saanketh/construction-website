import { Injectable } from '@angular/core';

export type ContentSection = 'projects' | 'services' | 'blogs' | 'newsletters' | 'gallery' | 'reviews';

export interface RecycleItem<T> {
  id: string;
  section: ContentSection;
  deletedAt: string;
  item: T;
}

const KEY_PREFIX = 'pb_cms_';
const RECYCLE_KEY = `${KEY_PREFIX}recycle`;

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {
  getList<T>(section: ContentSection, fallback: T[]): T[] {
    const key = this.sectionKey(section);
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data as T[];
      return fallback;
    } catch {
      return fallback;
    }
  }

  setList<T>(section: ContentSection, list: T[]): void {
    localStorage.setItem(this.sectionKey(section), JSON.stringify(list));
  }

  clearSection(section: ContentSection): void {
    localStorage.removeItem(this.sectionKey(section));
  }

  addToRecycle<T>(section: ContentSection, item: T): void {
    const recycle = this.getRecycle<unknown>();
    recycle.unshift({
      id: this.uid(),
      section,
      deletedAt: new Date().toISOString(),
      item
    } as RecycleItem<T>);
    localStorage.setItem(RECYCLE_KEY, JSON.stringify(recycle));
  }

  getRecycle<T>(): RecycleItem<T>[] {
    const raw = localStorage.getItem(RECYCLE_KEY);
    if (!raw) return [];
    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? (data as RecycleItem<T>[]) : [];
    } catch {
      return [];
    }
  }

  removeRecycle(id: string): void {
    const recycle = this.getRecycle<unknown>().filter(x => x.id !== id);
    localStorage.setItem(RECYCLE_KEY, JSON.stringify(recycle));
  }

  restoreFromRecycle<T>(id: string): RecycleItem<T> | null {
    const recycle = this.getRecycle<T>();
    const found = recycle.find(x => x.id === id) || null;
    if (!found) return null;
    this.removeRecycle(id);
    return found;
  }

  listRecycleImages(section: ContentSection): { id: string; label: string; imageUrl: string }[] {
    const recycle = this.getRecycle<any>();
    const out: { id: string; label: string; imageUrl: string }[] = [];

    for (const r of recycle) {
      if (r.section !== section) continue;
      const img = r.item?.imageUrl;
      if (typeof img !== 'string' || !img) continue;
      const title = r.item?.title || r.item?.name || section;
      out.push({
        id: r.id,
        label: `${title} (${new Date(r.deletedAt).toLocaleString()})`,
        imageUrl: img
      });
    }

    return out;
  }

  private sectionKey(section: ContentSection): string {
    return `${KEY_PREFIX}${section}`;
  }

  private uid(): string {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}
