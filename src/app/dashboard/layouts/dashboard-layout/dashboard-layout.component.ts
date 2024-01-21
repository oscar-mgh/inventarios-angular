import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  
}
