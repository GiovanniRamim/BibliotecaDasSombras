import { Component } from '@angular/core';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-midias',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './midias.component.html',
})
export class MidiasComponent {
  caminho = 'assets/midias.csv';
}
