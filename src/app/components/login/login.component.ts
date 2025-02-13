import { Component } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninComponent, SignupComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('flipAnimation', [
      transition(':enter', [
        style({ transform: 'rotateY(90deg)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'rotateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'rotateY(-90deg)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent {
  isSignin = true;

  toggleForm() {
    this.isSignin = !this.isSignin;
  }
}
