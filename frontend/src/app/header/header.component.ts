import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { Router, NavigationEnd } from '@angular/router'; // Importa Router y NavigationEnd para navegación y detección de cambios de ruta
import { NgIf } from '@angular/common'; // Importa NgIf para directivas estructurales en el template

@Component({
  selector: 'app-header', // Nombre del selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [NgIf], // Importa NgIf para usar *ngIf en el template
  templateUrl: './header.component.html', // Ruta al archivo de template HTML
  styleUrl: './header.component.css' // Ruta al archivo de estilos CSS
})
export class HeaderComponent implements OnInit { // Define la clase del componente e implementa OnInit
  isLoggedIn = false; // Variable para saber si el usuario está logueado

  // Inyecta el servicio Router para poder navegar entre rutas
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.isBrowser()) {
        this.isLoggedIn = !!localStorage.getItem('userId');
      }
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    if (this.isBrowser()) {
      this.isLoggedIn = !!localStorage.getItem('userId');
    }
  }

  // Esta función verifica si estamos en el navegador
  isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  // Navega al dashboard solo si el usuario está logueado
  goToDashboard() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Navega a la página "Sobre nosotros"
  goToAbout() {
    this.router.navigate(['/sobre-nosotros']);
  }
}
