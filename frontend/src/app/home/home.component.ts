import { Component } from '@angular/core'; // Importa Component para definir el componente
import { Router } from '@angular/router'; // Importa Router para navegación entre rutas

@Component({
  selector: 'app-home', // Selector para usar este componente en HTML
  templateUrl: './home.component.html', // Ruta al archivo de template HTML
  styleUrl: './home.component.css' // Ruta al archivo de estilos CSS
})
export class HomeComponent {
  // Inyecta el servicio Router para poder navegar entre rutas
  constructor(private router: Router) {}

  // Método para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Método para navegar a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
