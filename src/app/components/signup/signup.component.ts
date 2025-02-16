import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { terms, ...userData } = this.signupForm.value; // Remove 'terms'
      this.authService
        .signup(
          userData.name,
          userData.email,
          userData.password,
          userData.address
        )
        .subscribe({
          next: (response) => {
            console.log('Cadastro realizado com sucesso!', response);
            this.signupForm.reset();
          },
          error: (err) => {
            console.error('Erro ao cadastrar:', err);
          },
        });
    }
  }
}
