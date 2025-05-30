import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'pedir-cita', loadComponent: () => import('./pedir-cita/pedir-cita.component').then(m => m.PedirCitaComponent) },
  { path: 'ver-citas', loadComponent: () => import('./ver-citas/ver-citas.component').then(m => m.VerCitasComponent) },
  { path: 'cancelar-cita', loadComponent: () => import('./cancelar-cita/cancelar-cita.component').then(m => m.CancelarCitaComponent) },
  { path: 'actualizar-datos', loadComponent: () => import('./actualizar-datos/actualizar-datos.component').then(m => m.ActualizarDatosComponent) },
  { path: 'ver-historial', loadComponent: () => import('./ver-historial/ver-historial.component').then(m => m.VerHistorialComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  // ...otras rutas...
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
