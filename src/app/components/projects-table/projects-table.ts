import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, DecimalPipe } from '@angular/common';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto';

@Component({
  selector: 'app-projects-table',
  imports: [NgFor, DecimalPipe],
  templateUrl: './projects-table.html',
  styleUrl: './projects-table.css',
})
export class ProjectsTable implements OnInit {
  private readonly proyectoService = inject(ProyectoService);

  protected readonly proyectos = signal<Proyecto[]>([]);

  ngOnInit(): void {
    this.proyectoService.getAll().subscribe({
      next: (proyectos) => this.proyectos.set(proyectos),
      error: (err) => console.error('No se pudo cargar los proyectos', err),
    });
  }
}
