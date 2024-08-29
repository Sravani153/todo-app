import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item.model';
import { ItemService } from 'src/app/services/item.service';

  @Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
  })
  export class BookmarkComponent implements OnInit {
    bookmarkedItems: Item[] = [];
    displayedColumns: string[] = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'actions'];

    constructor(private router: Router, private itemService:ItemService ) {}

    ngOnInit(): void {
      this.loadBookmarkedItems();
    }

    loadBookmarkedItems(): void {
      this.itemService.getBookmarkedItems().subscribe((items) => {
        this.bookmarkedItems = items;
      });
    }

    onEdit(id: string): void {
      this.router.navigate(['/add'], { queryParams: { id } });
    }

    onDelete(id: string): void {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadBookmarkedItems();
      });
    }
  }

