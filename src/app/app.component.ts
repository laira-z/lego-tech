import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapAirplane } from '@ng-icons/bootstrap-icons';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideIcons({ bootstrapAirplane })],
})
export class AppComponent {
  icon = bootstrapAirplane;
  title = 'lego-tech';
}
