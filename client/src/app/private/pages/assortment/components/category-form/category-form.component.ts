import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { CategoryService } from '../../../../../core/services/category/category.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category } from 'src/app/core/models/category/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  public isNew: boolean = true;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
    this.getCategory();
  }

  private getCategory() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoryService.getCategoryById(params['id']);
          }
          return of(null);
        }),
      )
      .subscribe((category: Category) => {
        if (category) {
          this.name.patchValue(category.name);
        }
      });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  onSubmit(value) {
    console.log('value: ', value);
  }
}
