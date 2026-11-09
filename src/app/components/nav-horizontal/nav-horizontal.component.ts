import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-horizontal',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-horizontal.component.html',
  styleUrl: './nav-horizontal.component.css',
})
export class NavHorizontalComponent {
  links = [
    { rotulo: 'Literatura', rota: '/literatura' },
    { rotulo: 'Mídias', rota: '/midias' },
    { rotulo: 'Música', rota: '/musica' },
    { rotulo: 'Blog', rota: '/blog' },
  ];
}
