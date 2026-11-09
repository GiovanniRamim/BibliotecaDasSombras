import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { TabelaDados } from '../../models/tabela-dados.model';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent implements OnChanges {
  /** Caminho da planilha local, ex.: assets/literatura.csv */
  @Input() caminho = '';

  dados: TabelaDados | null = null;
  carregando = false;
  erro: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caminho']) {
      this.carregar();
    }
  }

  private carregar(): void {
    if (!this.caminho) return;

    this.carregando = true;
    this.erro = null;

    this.dataService
      .extrair(this.caminho)
      .then((dados) => (this.dados = dados))
      .catch((err: Error) => {
        this.dados = null;
        this.erro = `Não foi possível carregar a planilha: ${err.message}`;
      })
      .finally(() => (this.carregando = false));
  }
}
