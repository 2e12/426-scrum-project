import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import Category from '../../../../models/category';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {
  @Output() selectedCategory = new EventEmitter<string>();
  newCategoryFormControl = this.formBuilder.control('', [Validators.required]);

  categories: Category[] = [];
  categoryFormControl = this.formBuilder.control('', [Validators.required]);

  constructor(private productService: ProductService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productService.getAllCategories(this.userService.getUser()).subscribe((categories: Category[]) => {
      this.categories = categories;
      this.categories.push({name: 'Neue Kategorie', id: -1});
    });

    this.categoryFormControl.valueChanges.subscribe(value => {
      if (value === this.categories[this.categories.length - 1].name) {
        this.selectedCategory.emit(this.newCategoryFormControl.value);
        return;
      }
      this.selectedCategory.emit(value);
    });
    this.newCategoryFormControl.valueChanges.subscribe(value => {
      this.selectedCategory.emit(value);
    });
  }

  get newCategorySelected() {
    if (this.categories[0] === undefined) {
      return false;
    }
    return this.categoryFormControl.value === this.categories[this.categories.length - 1].name;
  }
}
