import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MaterialService } from '../../../../../core/services/material-utils/material.service';
import { CategoryService } from '../../../../../core/services/assortment/category.service';
import { Category } from '../../../../../core/models/assortment/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  public isNew: boolean = true;
  public form: FormGroup;
  public imagePreview: string | ArrayBuffer = '';
  public category: Category;
  private image: File;

  @ViewChild('inputFile') inputRef: ElementRef;
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
    this.form.disable();
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
          this.category = category;
          this.name.patchValue(category.name);
          this.imagePreview = category.imageSrc;
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public triggerClick() {
    this.inputRef.nativeElement.click();
  }

  public onFileUpload(event) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  public onSubmit(value) {
    this.form.disable();

    let submit$;

    if (this.isNew) {
      submit$ = this.categoryService.createCategory(value.name, this.image);
    } else {
      submit$ = this.categoryService.updateCategory(
        this.category._id,
        value.name,
        this.image,
      );
    }

    submit$.subscribe(
      (category: Category) => {
        this.category = category;
        this.form.enable();
      },
      err => this.form.enable(),
    );
  }

  public removeCategory() {
    const decision = window.confirm(
      `Are you sure you want to delete the category ${this.category.name}`,
    );

    if (decision) {
      this.categoryService.removeCategory(this.category._id).subscribe();
    }
  }
}
