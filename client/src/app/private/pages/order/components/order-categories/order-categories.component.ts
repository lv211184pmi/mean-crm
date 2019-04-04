import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../../../../../core/services/assortment/category.service';
import { Category } from '../../../../../core/models/assortment/category.model';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private catService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.catService.getAllCategories();
  }
}
