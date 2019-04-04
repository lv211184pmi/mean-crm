import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../../../core/services/assortment/category.service';
import { Category } from '../../../core/models/assortment/category.model';

@Component({
  selector: 'app-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
})
export class AssortmentComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categories$ = this.categoryService.getAllCategories();
  }
}
