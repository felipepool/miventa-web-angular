import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriaResponse } from '../../categorias.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriasService } from '../../categorias.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriaForm } from '../../components/categoria-form/categoria-form';

@Component({
  selector: 'app-categorias-page',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './categorias-page.html',
  styleUrl: './categorias-page.scss',
})
export class CategoriasPage {

  displayedColumns: string[] = ['nombre', 'descripcion', 'activa', 'acciones'];

  categorias = signal<CategoriaResponse[]>([])
  categoriaService = inject(CategoriasService)
  private readonly dialog = inject(MatDialog);

  categoriasResource = rxResource({
    stream: () => {
      return this.categoriaService.getAll();
    }
  })

  private readonly sincronizarTabla = effect(() => {
    const categorias = this.categoriasResource.hasValue()
      ? this.categoriasResource.value()
      : [];

    this.dataSource.data = categorias;
  });

  readonly dataSource = new MatTableDataSource<CategoriaResponse>(this.categoriasResource.value());
  readonly paginator = viewChild(MatPaginator);

  private readonly conectarPaginador = effect(() => {
    const paginator = this.paginator();

    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  });

  agregar() {
    const dialogRef = this.dialog.open(CategoriaForm, {
      width: '520px',
      height: '550px',
      ariaLabelledBy: 'categoria-form-title',
    });

    dialogRef.componentInstance.guardar.subscribe(datos => {

      this.categoriaService.crear(datos).subscribe({
        next: () => {
          dialogRef.close(true);
          this.categoriasResource.reload();
        },
        error: () => {
          dialogRef.componentRef?.setInput(
            'errorGuardado',
            'No se pudo guardar la categoría. Intenta nuevamente.'
          );
        },
      });
    });
  }

    editar(categoria: CategoriaResponse) {
    const ref = this.dialog.open(CategoriaForm, {
      width: '520px',
      ariaLabelledBy: 'categoria-form-title',
      data: categoria,
    });

    ref.componentInstance.guardar.subscribe(datos => {
      console.log('ID a editar:', categoria.id);
      console.log('Datos modificados:', datos);

      // Aquí llamarás al servicio para actualizar.
    });
  }

  desactivar(row: string) {
    console.log(row)
  }

  confirmarEliminar(row: string) {
    console.log(row)
  }

}
