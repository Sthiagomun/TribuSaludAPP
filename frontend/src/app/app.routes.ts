import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component'; // Asegúrate de tener este componente

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // otras rutas...
];
