import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    name: new FormControl('', Validators.minLength(5)),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(4)),
  });

  logar() {
    console.log('Entrou!!');
    console.log(this.loginForm);
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }
}
