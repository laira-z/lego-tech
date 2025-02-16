import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { InfoDetailsComponent } from './components/info-details/info-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guard/auth.guard';
import { SigninComponent } from './components/signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'infoDeatils/:id',
    component: InfoDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
];
