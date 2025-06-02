import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-datos.component.html',
  styleUrl: './actualizar-datos.component.css'
})
export class ActualizarDatosComponent implements OnInit {
  updateForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.updateForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_de_documento: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      eps: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.updateForm.patchValue({
            nombre: user.nombre,
            email: user.email,
            tipo_de_documento: user.tipo_de_documento,
            documento: user.documento,
            telefono: user.telefono,
            eps: user.eps
          });
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del usuario';
        }
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userService.updateUser(userId, this.updateForm.value).subscribe({
          next: (response) => {
            this.successMessage = 'Datos actualizados correctamente';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500); // Espera 1.5 segundos antes de redirigir
          },
          error: (err) => {
            this.errorMessage = 'Error al actualizar los datos';
            this.successMessage = '';
          }
        });
      }
    }
  }
}
