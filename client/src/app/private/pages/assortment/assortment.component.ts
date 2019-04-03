import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category/category.model';
import { Observable } from 'rxjs';

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
