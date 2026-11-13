import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LiteraturaComponent } from '../literatura/literatura.component';
import { MusicaComponent } from '../musica/musica.component';
import { MidiasComponent } from '../midias/midias.component';
import { LojasComponent } from '../lojas/lojas.component';
import { BlogComponent } from '../blog/blog.component';
import { PaginaService } from '../../services/pagina.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    AsyncPipe,
    LiteraturaComponent,
    MusicaComponent,
    MidiasComponent,
    LojasComponent,
    BlogComponent,
  ],
  templateUrl: './base.component.html',
})
export class BaseComponent {
  private readonly paginaService = inject(PaginaService);

  /** Página atual, recebida do serviço sempre que o nav muda. */
  readonly pagina$ = this.paginaService.pagina$;
}
