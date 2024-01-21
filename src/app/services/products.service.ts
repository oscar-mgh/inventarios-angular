import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartialProduct, Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?limit=100`);
  }

  createProduct(product: PartialProduct) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<Product>(`${this.baseUrl}/products`, product, { headers })
      .subscribe({
        next: (_data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/dashboard/productos');
        },
        error: (err) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal al crear el producto',
          }),
      });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(id: string, product: PartialProduct): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.getProductById(id);
    return this.http.patch<Product>(`${this.baseUrl}/products/${id}`, product, {
      headers,
    });
  }

  deleteProduct(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Product>(`${this.baseUrl}/products/${id}`, {
      headers,
    });
  }
}
