import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item.model';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchValue: string = '';
  displayedColumns: string[] = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'bookmarked', 'actions'];

  constructor(private router: Router, private itemService: ItemService, private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
      this.filteredItems = [...this.items];
    });
  }

  applyFilter(event: Event): void {
    const filterValue = this.searchValue.toLowerCase().trim();
    if (filterValue) {
      this.itemService.searchItems(filterValue).subscribe((filteredItems) => {
        this.filteredItems = filteredItems;
      });
    } else {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchValue = '';
    this.filteredItems = this.items;
  }

  toggleBookmarked(item: Item): void {
    const updatedBookmarkStatus = !item.bookmarked;
    this.itemService.toggleBookmark(item.id, updatedBookmarkStatus).subscribe(() => {
      item.bookmarked = updatedBookmarkStatus;
            this.loadItems();
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/add'], { queryParams: { id } });
  }

  onDelete(id: string): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.showSnackBar('Item deleted successfully!', 'Close');
      this.loadItems();
    });
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
