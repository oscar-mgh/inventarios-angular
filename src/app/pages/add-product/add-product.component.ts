import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { PartialProduct } from '../../interfaces/product.interface';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  styles: `
    .full-width {
      width: 100%;
    }
    .card {
      padding: 1.2rem;
    }
    .spacer {
      margin: 0 auto;
    }
  `,
})
export class AddProductComponent {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);

  public addProductForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [1, [Validators.required, Validators.min(1)]],
  });

  saveProduct() {
    if (this.addProductForm.invalid) return;
    const product: PartialProduct = this.addProductForm.value;
    this.productsService.createProduct(product);
  }
}
