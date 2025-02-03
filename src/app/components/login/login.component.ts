import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(5), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
  });

  logar() {
    console.log('Entrou!!');
    console.log(this.loginForm);
  }
  Submit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    console.log(this.userForm.value);
  }
}
