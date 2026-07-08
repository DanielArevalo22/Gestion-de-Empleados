import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Body } from '../../components/body/body';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, Body, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
