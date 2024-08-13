import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  inProgressItems: Item[] = [];
  completedItems: Item[] = [];
  displayedColumns: string[] = ['name', 'dob', 'gender', 'bookmarked', 'actions'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
  }

  toggleBookmark(item: Item): void {
    item.bookmarked = !item.bookmarked;
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  onEdit(id: string): void {
    this.router.navigate(['/add'], { queryParams: { id } });
  }

  onDelete(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.updateLocalStorage();
  }
}
