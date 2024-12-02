import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route = new Router();

  buscar() {
    let id = this.route.url; // details/awdawd12
    fetch(`api123/${id}`);
  }
}
