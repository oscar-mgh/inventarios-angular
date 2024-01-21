import { Component, OnInit, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [MaterialModule, DataTableComponent],
  templateUrl: './list-products.component.html',
  styles: `
  .box {
  display: block;
  margin: 0 auto;
}
`,
})
export class ListProductsComponent implements OnInit {
  public products = signal<Product[]>([]);
  public data = signal<string[]>([]);

  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products.set(data);
    });
  }
}
