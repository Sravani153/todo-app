import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bookmarked: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadItem(id);
    }
  }

  loadItem(id: string): void {
    const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
    const item = items.find(i => i.id === id);
    if (item) {
      this.itemForm.patchValue(item);
    }
  }

  onSave(): void {
    if (this.itemForm.invalid) {
      return;
    }

    let storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    const item = this.itemForm.value;

    if (this.isEdit) {
      storedItems = storedItems.map((i: Item) =>
        i.id === item.id ? item : i
      );
    } else {
      item.id = new Date().getTime().toString();
      storedItems.push(item);
    }

    localStorage.setItem('items', JSON.stringify(storedItems));
    this.router.navigate(['/list']);
  }
}
