import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item = { id: '', name: '', dateOfBirth: new Date(), gender: '', bookmarked: false };
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadItem(id);
    }
  }

  loadItem(id: string): void {
    const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
    this.item = items.find(i => i.id === id) || this.item;
  }

  onSave(): void {
    let storedItems = JSON.parse(localStorage.getItem('items') || '[]');

    if (this.isEdit) {
      storedItems = storedItems.map((i: Item) =>
        i.id === this.item.id ? this.item : i
      );
    } else {
      this.item.id = new Date().getTime().toString();
      storedItems.push(this.item);
    }

    localStorage.setItem('items', JSON.stringify(storedItems));
    this.router.navigate(['/list']);
  }
}
