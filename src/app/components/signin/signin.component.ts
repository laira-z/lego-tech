import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  @Output() switchToSignup = new EventEmitter<void>();

  signUp() {
    this.switchToSignup.emit();
  }

  signinForm: FormGroup;

  constructor() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  // Função para enviar o formulário (a ser chamada ao clicar em "Sign in")
  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value); // Você pode fazer a chamada à API aqui
      this.signinForm.reset();
    } else {
      console.log('Formulário inválido');
    }
  }
}
