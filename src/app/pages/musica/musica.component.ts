import { Component } from '@angular/core';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-musica',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './musica.component.html',
})
export class MusicaComponent {
  caminho = 'assets/musica.csv';
}
