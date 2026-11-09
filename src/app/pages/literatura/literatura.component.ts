import { Component } from '@angular/core';
import { TabelaComponent } from '../../components/tabela/tabela.component';

@Component({
  selector: 'app-literatura',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './literatura.component.html',
})
export class LiteraturaComponent {
  caminho = 'assets/literatura.csv';
}
