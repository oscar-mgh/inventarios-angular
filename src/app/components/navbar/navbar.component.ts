import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styles: `
  .spacer {
    margin: 0 auto;
  }

  @media only screen and (max-width: 600px) {
    p, span {
      display: none;
    }

    .navbar {
      font-zise: 50%;
    }

    .sesion {
      position: absolute;
      right: 5px;
    }
  }`,
})
export class NavbarComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUser();
  }

  onLogout() {
    this.authService.logout();
  }
}
