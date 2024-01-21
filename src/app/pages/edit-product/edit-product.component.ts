import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { PartialProduct } from '../../interfaces/product.interface';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
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
export class EditProductComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public editForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [1, [Validators.required, Validators.min(1)]],
  });

  private subscription?: Subscription;

  ngOnInit(): void {
    this.setProduct();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private setProduct() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.productsService.getProductById(id);
        }),
        tap((product) => {
          this.setFormValues(product);
        }),
        catchError((err) =>
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener el producto',
            text: 'Asegurate de que el id sea un numero en el url',
          })
        )
      )
      .subscribe();
  }

  private setFormValues(product: PartialProduct) {
    this.editForm.get('description')?.setValue(product.description);
    this.editForm.get('price')?.setValue(product.price);
    this.editForm.get('stock')?.setValue(product.stock);
  }

  saveProduct() {
    if (this.editForm.invalid) return;
    const productToUpdate: PartialProduct = this.editForm.value;
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.productsService.updateProduct(id, productToUpdate);
        }),
        catchError((err) =>
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el producto',
            text: 'Error inesperado, contacta con el administrador',
          })
        )
      )
      .subscribe({
        next: (_data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/dashboard/productos');
        },
      });
  }

  tryToDeleteProduct() {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0099FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct();
      }
    });
  }

  private deleteProduct() {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.productsService.deleteProduct(id);
        })
      )
      .subscribe({
        next: (_data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto borrado correctamente',
            showConfirmButton: false,
            timer: 1400,
          });
          this.router.navigateByUrl('/dashboard/productos');
        },
        error: (_err) =>
          Swal.fire({
            icon: 'error',
            title: 'Error al borrar el producto',
            text: 'Error inesperado, contacta con el administrador',
          }),
      });
  }
}
