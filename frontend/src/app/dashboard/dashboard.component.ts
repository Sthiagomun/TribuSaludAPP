import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = 'Usuario';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log('userId en localStorage:', userId);
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          console.log('Respuesta del backend:', user);
          this.userName = user?.nombre ?? 'Usuario';
        },
        error: (err) => {
          console.log('Error al obtener usuario:', err);
          this.userName = 'Usuario';
        }
      });
    } else {
      this.userName = 'Usuario';
    }
  }

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
