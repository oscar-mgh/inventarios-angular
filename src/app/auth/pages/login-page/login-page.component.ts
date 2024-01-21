import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MaterialModule],
  templateUrl: './login-page.component.html',
  styles: `
  @media only screen and (max-width: 600px) {
    .myCard{
      width: 90%;
    }
  }
  `,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.loginForm, field);
  }

  login() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (_err: any) =>
        Swal.fire(
          'Error al iniciar sesion',
          'Los datos no coinciden, intenta nuevamente',
          'error'
        ),
    });
  }
}
