import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapAirplane } from '@ng-icons/bootstrap-icons';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideIcons({ bootstrapAirplane })],
})
export class AppComponent {
  icon = bootstrapAirplane;
  title = 'lego-tech';
}
