import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item.model';

  @Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
  })
  export class BookmarkComponent implements OnInit {
    bookmarkedItems: Item[] = [];
    displayedColumns: string[] = ['name', 'dob', 'gender', 'actions'];

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.loadBookmarkedItems();
    }

    loadBookmarkedItems(): void {
      const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
      this.bookmarkedItems = items.filter(item => item.bookmarked);
    }

    onEdit(id: string): void {
      this.router.navigate(['/add'], { queryParams: { id } });
    }

    onDelete(id: string): void {
      let items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
      items = items.filter(item => item.id !== id);
      localStorage.setItem('items', JSON.stringify(items));
      this.loadBookmarkedItems();
    }
  }

