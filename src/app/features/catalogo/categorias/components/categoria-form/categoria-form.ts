import { Component, inject, input, model, output, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  required,
} from '@angular/forms/signals';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CategoriaFormData,
  CategoriaResponse,
} from '../../categorias.interface';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-categoria-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormRoot,
    FormField,
    FormsModule,
    MatSlideToggleModule
  ],
  templateUrl: './categoria-form.html',
})
export class CategoriaForm {

  private readonly categoria = inject<CategoriaResponse | null>(MAT_DIALOG_DATA);

  readonly errorGuardado = input<string | null>(null);

  readonly guardar = output<CategoriaFormData>();

  readonly editando = this.categoria !== null;

  readonly titulo = this.editando
    ? 'Editar categoría'
    : 'Nueva categoría';

  readonly modelo = signal<CategoriaFormData>({
    nombre: this.categoria?.nombre ?? '',
    descripcion: this.categoria?.descripcion ?? '',
    activo: this.categoria?.activo ?? true
  });

  readonly dialogRef = inject(MatDialogRef<CategoriaForm>);

  readonly categoriaForm = form(
    this.modelo,
    path => {
      required(path.nombre, {
        message: 'Ingresa el nombre de la categoría.',
      });
    },
    {
      submission: {
        action: async field => {
          this.guardar.emit(field().value());

          // Pausa de 3 segundos para probar el estado del botón.
          await new Promise<void>(resolve => {
            setTimeout(resolve, 3000);
          });

          return;
        },
      },
    },
  );
}
