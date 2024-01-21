import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MaterialModule, CommonModule],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm: FormGroup = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validatorsService.passwordPattern),
        ],
      ],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorsService.areFieldsEqual('password', 'password2'),
      ],
    }
  );

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.registerForm, field);
  }

  register() {
    const { email, password, fullName } = this.registerForm.value;
    this.authService.register(email, password, fullName).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (message: string | undefined) => Swal.fire('Error', message, 'error'),
    });
  }
}
