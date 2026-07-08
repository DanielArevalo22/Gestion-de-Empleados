import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto';

@Component({
  selector: 'app-info-list',
  imports: [NgFor],
  templateUrl: './info-list.html',
  styleUrl: './info-list.css',
})
export class InfoList implements OnInit {
  private readonly proyectoService = inject(ProyectoService);

  protected readonly proyectos = signal<Proyecto[]>([]);

  ngOnInit(): void {
    this.proyectoService.getActivos().subscribe({
      next: (proyectos) => {
        this.proyectos.set(
          [...proyectos].sort((a, b) => a.fechaFin.localeCompare(b.fechaFin)).slice(0, 5),
        );
      },
      error: (err) => console.error('No se pudo cargar los proyectos', err),
    });
  }
}
