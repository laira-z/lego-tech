import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { bootstrapAirplane } from '@ng-icons/bootstrap-icons';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideIcons({ bootstrapAirplane })],
})
export class AppComponent {
  icon = bootstrapAirplane;
  title = 'lego-tech';

  isLoginPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage =
        this.router.url.includes('/login') ||
        this.router.url.includes('/signup');
    });
  }
}
