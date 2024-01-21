import { Routes } from '@angular/router';
import { ListProductsComponent } from '../pages/list-products/list-products.component';
import { AddProductComponent } from '../pages/add-product/add-product.component';
import { EditProductComponent } from '../pages/edit-product/edit-product.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'products',
        component: ListProductsComponent,
      },
      {
        path: 'agregar',
        component: AddProductComponent,
      },
      {
        path: 'editar/:id',
        component: EditProductComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default dashboardRoutes;
