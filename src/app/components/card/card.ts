import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgIf],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() numero: number | null = null;
  @Input() label = '';
  @Input() icon?: string;
}
