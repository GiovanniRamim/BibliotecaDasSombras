import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-subsections',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './subsections.component.html',
  styleUrl: './subsections.component.css',
})
export class SubsectionsComponent {
  links = [
    { rotulo: 'Literatura', rota: '/literatura' },
    { rotulo: 'Mídias', rota: '/midias' },
    { rotulo: 'Música', rota: '/musica' },
    { rotulo: 'Blog', rota: '/blog' },
  ];
}
