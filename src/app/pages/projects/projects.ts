import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { AssignmentsTable } from '../../components/assignments-table/assignments-table';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto';

@Component({
  selector: 'app-projects',
  imports: [Footer, Header, NgIf, NgFor, DecimalPipe, FormsModule, AssignmentsTable],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly proyectoService = inject(ProyectoService);

  protected readonly activateForm = signal(false);
  protected readonly proyectosActivos = signal<Proyecto[]>([]);
  protected readonly modoEdicion = signal(false);
  protected readonly proyectoDetalle = signal<Proyecto | null>(null);

  private proyectoEditId: number | null = null;

  protected readonly today = new Date().toISOString().slice(0, 10);

  protected nuevoProyecto = {
    proyecto: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: 0,
  };

  ngOnInit(): void {
    this.cargarProyectos();
  }

  private cargarProyectos(): void {
    this.proyectoService.getActivos().subscribe({
      next: (proyectos) => this.proyectosActivos.set(proyectos),
      error: (err) => console.error('No se pudo cargar los proyectos', err),
    });
  }

  protected fechaInicioInvalida(): boolean {
    if (this.modoEdicion()) return false;
    return !!this.nuevoProyecto.fechaInicio && this.nuevoProyecto.fechaInicio < this.today;
  }

  protected fechaFinInvalida(): boolean {
    const { fechaInicio, fechaFin } = this.nuevoProyecto;
    return !!fechaInicio && !!fechaFin && fechaFin < fechaInicio;
  }

  showCreatePr(){
    if (this.activateForm()) {
      this.cancelarFormulario();
      return;
    }
    this.activateForm.set(true);
  }

  private cancelarFormulario(): void {
    this.activateForm.set(false);
    this.modoEdicion.set(false);
    this.proyectoEditId = null;
    this.nuevoProyecto = { proyecto: '', fechaInicio: '', fechaFin: '', presupuesto: 0 };
  }

  crearProyecto(form: NgForm): void {
    if (form.invalid || this.fechaFinInvalida() || this.fechaInicioInvalida()) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.modoEdicion() && this.proyectoEditId !== null) {
      this.proyectoService.update(this.proyectoEditId, this.nuevoProyecto).subscribe({
        next: () => {
          this.cargarProyectos();
          this.cancelarFormulario();
        },
        error: (err) => console.error('No se pudo actualizar el proyecto', err),
      });
      return;
    }

    this.proyectoService.create({ ...this.nuevoProyecto, activo: true }).subscribe({
      next: () => {
        this.cargarProyectos();
        this.cancelarFormulario();
      },
      error: (err) => console.error('No se pudo crear el proyecto', err),
    });
  }

  verProyecto(p: Proyecto): void {
    this.proyectoDetalle.set(p);
  }

  cerrarDetalle(): void {
    this.proyectoDetalle.set(null);
  }

  editarProyecto(p: Proyecto): void {
    this.modoEdicion.set(true);
    this.proyectoEditId = p.idProyecto;
    this.nuevoProyecto = {
      proyecto: p.proyecto,
      fechaInicio: p.fechaInicio,
      fechaFin: p.fechaFin,
      presupuesto: p.presupuesto,
    };
    this.activateForm.set(true);
  }

  eliminarProyecto(p: Proyecto): void {
    const confirmado = confirm(`¿Eliminar el proyecto ${p.proyecto}?`);
    if (!confirmado) return;

    this.proyectoService.delete(p.idProyecto).subscribe({
      next: () => this.cargarProyectos(),
      error: (err) => console.error('No se pudo eliminar el proyecto', err),
    });
  }
}
