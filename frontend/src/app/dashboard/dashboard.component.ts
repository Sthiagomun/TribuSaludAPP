import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { Router } from '@angular/router'; // Importa Router para navegación entre rutas
import { UserService } from '../auth/user.service'; // Importa el servicio de usuario para obtener datos del usuario

@Component({
  selector: 'app-dashboard', // Selector para usar este componente en HTML
  templateUrl: './dashboard.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./dashboard.component.css'] // Ruta al archivo de estilos CSS
})
export class DashboardComponent implements OnInit {
  userName: string = 'Usuario'; // Variable para mostrar el nombre del usuario en el dashboard

  // Inyecta Router para navegación y UserService para obtener datos del usuario
  constructor(private router: Router, private userService: UserService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtiene el userId almacenado en localStorage
    console.log('userId en localStorage:', userId); // Muestra el userId en consola para depuración
    if (userId) {
      // Si existe userId, obtiene los datos del usuario desde el backend
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          console.log('Respuesta del backend:', user); // Muestra la respuesta del backend en consola
          this.userName = user?.nombre ?? 'Usuario'; // Asigna el nombre del usuario o 'Usuario' si no existe
        },
        error: (err) => {
          console.log('Error al obtener usuario:', err); // Muestra el error en consola si falla la petición
          this.userName = 'Usuario'; // Asigna 'Usuario' si hay error
        }
      });
    } else {
      // Si no hay userId en localStorage, asigna 'Usuario' por defecto
      this.userName = 'Usuario';
    }
  }

  // Método para navegar a una ruta específica
  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
