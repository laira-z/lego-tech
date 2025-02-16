import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = { name: '', email: '', address: '', password: '' };
  editMode: boolean = false;
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        this.loading = false;
        console.log(data);
      },
      (error) => {
        console.error('Erro ao buscar dados do usuário', error);
        this.loading = false;
      }
    );
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.userService.updateUserProfile(this.user).subscribe(
      (data) => {
        this.user = data;
        this.editMode = false;
      },
      (error) => {
        console.error('Erro ao salvar alterações', error);
      }
    );
  }
}
