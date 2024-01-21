import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductsService } from '../../services/products.service';
import { MaterialModule } from '../../material.module';
import { Product } from '../../interfaces/product.interface';

@Component({
  standalone: true,
  imports: [
    MaterialModule,
    MatTableModule,
    CurrencyPipe,
    MatPaginatorModule,
    MatSortModule,
  ],
  selector: 'shared-data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'description', 'price', 'stock'];
  public dataSource = new MatTableDataSource<Product>();
  private router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private productsService = inject(ProductsService);

  constructor() {
    this.productsService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
  }

  editElement(id: number) {
    this.router.navigate(['/dashboard/editar/', id]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
