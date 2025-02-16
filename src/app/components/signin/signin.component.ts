import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router // Adicionando o Router para redirecionamento
  ) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService
        .login(this.signinForm.value.email, this.signinForm.value.password)
        .subscribe({
          next: (response) => {
            console.log('Login bem-sucedido', response);
            // Redireciona para a página inicial após login bem-sucedido
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.log('Erro no login', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
          },
        });
    } else {
      console.log('Formulário inválido');
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
