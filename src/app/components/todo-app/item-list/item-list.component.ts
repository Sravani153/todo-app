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
  filteredItems: Item[] = [];
  searchValue: string = '';
  displayedColumns: string[] = ['name', 'dob', 'gender', 'bookmarked', 'actions'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
    this.filteredItems = [...this.items];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.filteredItems = this.items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(filterValue);
      const dateMatch = new Date(item.dateOfBirth).toLocaleDateString().toLowerCase().includes(filterValue);
      return nameMatch || dateMatch;
    });
  }

  clearSearch(): void {
    this.searchValue = '';
    this.filteredItems = this.items;
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
    this.applyFilter({ target: { value: '' } } as any);
  }
}
