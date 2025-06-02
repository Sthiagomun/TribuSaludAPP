import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'; // Importa módulos y clases para formularios reactivos
import { UserService } from '../auth/user.service'; // Importa el servicio de usuario para operaciones relacionadas con el usuario
import { Router } from '@angular/router'; // Importa Router para navegación

@Component({
  selector: 'app-actualizar-datos', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule, ReactiveFormsModule], // Importa módulos necesarios para el template
  templateUrl: './actualizar-datos.component.html', // Ruta al archivo de template HTML
  styleUrl: './actualizar-datos.component.css' // Ruta al archivo de estilos CSS
})
export class ActualizarDatosComponent implements OnInit { // Define la clase del componente e implementa OnInit
  updateForm: FormGroup; // Formulario reactivo para actualizar datos
  successMessage = ''; // Mensaje de éxito al actualizar
  errorMessage = ''; // Mensaje de error al actualizar

  // Inyecta FormBuilder para construir el formulario, UserService para operaciones de usuario y Router para navegación
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Inicializa el formulario con los campos y validaciones necesarias
    this.updateForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_de_documento: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      eps: ['', Validators.required],
      historialMedico: [''],
      currentPassword: [''], // Campo para la contraseña actual
      newPassword: [''],     // Campo para nueva contraseña
      confirmPassword: ['']  // Campo para confirmar nueva contraseña
    }, { validators: this.passwordsValidator() }); // <-- Agrega el validador personalizado
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtiene el userId del localStorage
    if (userId) {
      // Si hay userId, obtiene los datos del usuario y los carga en el formulario
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.updateForm.patchValue({
            nombre: user.nombre,
            email: user.email,
            tipo_de_documento: user.tipo_de_documento,
            documento: user.documento,
            telefono: user.telefono,
            eps: user.eps,
            historialMedico: user.historialMedico || '' // Carga historial médico si existe
          });
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del usuario'; // Muestra mensaje de error si falla la carga
        }
      });
    }
  }

  // Validador personalizado para contraseñas opcionales
  passwordsValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const current = group.get('currentPassword')?.value;
      const nueva = group.get('newPassword')?.value;
      const confirmar = group.get('confirmPassword')?.value;

      // Si alguno de los campos de contraseña tiene valor, todos deben ser válidos
      if (nueva || confirmar || current) {
        if (!current || !nueva || !confirmar) {
          return { passwordFields: true };
        }
        if (nueva.length < 6 || confirmar.length < 6) {
          return { passwordLength: true };
        }
        if (nueva !== confirmar) {
          return { passwordMismatch: true };
        }
      }
      return null;
    };
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    const currentPassword = this.updateForm.value.currentPassword;
    const newPassword = this.updateForm.value.newPassword;
    const confirmPassword = this.updateForm.value.confirmPassword;

    // Si el usuario quiere cambiar la contraseña, debe ingresar la actual y confirmar la nueva
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        this.errorMessage = 'Debes ingresar tu contraseña actual para cambiar la contraseña.';
        return;
      }
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }
      if (newPassword.length < 6) {
        this.errorMessage = 'La nueva contraseña debe tener al menos 6 caracteres.';
        return;
      }
    }

    if (this.updateForm.valid) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Prepara los datos para enviar
        const formData = { ...this.updateForm.value };
        // Solo incluye la nueva contraseña si fue ingresada
        if (formData.newPassword) {
          formData.password = formData.newPassword;
          formData.currentPassword = currentPassword; // Envía la contraseña actual para validación en backend
        } else {
          delete formData.currentPassword;
        }
        delete formData.newPassword;
        delete formData.confirmPassword;

        this.userService.updateUser(userId, formData).subscribe({
          next: (response) => {
            this.successMessage = 'Datos actualizados correctamente';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          },
          error: (err) => {
            // Si el backend responde con error de contraseña, muestra el mensaje adecuado
            if (err.error && err.error.message && err.error.message.includes('contraseña actual')) {
              this.errorMessage = 'La contraseña actual es incorrecta.';
            } else {
              this.errorMessage = 'Error al actualizar los datos';
            }
            this.successMessage = '';
          }
        });
      }
    }
  }
}
