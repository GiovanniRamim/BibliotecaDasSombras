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

  /** Filtro de pesquisa por coluna: { nomeDaColuna: termo } */
  filtros: Record<string, string> = {};

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caminho']) {
      this.filtros = {};
      this.carregar();
    }
  }

  /** Linhas que atendem a todos os filtros preenchidos. */
  get linhasFiltradas(): Record<string, string>[] {
    if (!this.dados) return [];

    const ativos = Object.entries(this.filtros)
      .map(([coluna, termo]) => [coluna, this.normalizar(termo)] as const)
      .filter(([, termo]) => termo.length > 0);

    if (ativos.length === 0) return this.dados.linhas;

    return this.dados.linhas.filter((linha) =>
      ativos.every(([coluna, termo]) =>
        this.normalizar(String(linha[coluna] ?? '')).includes(termo)
      )
    );
  }

  atualizarFiltro(coluna: string, valor: string): void {
    this.filtros = { ...this.filtros, [coluna]: valor };
  }

  limparFiltros(): void {
    this.filtros = {};
  }

  /** Remove acentos e diferencia maiúsculas/minúsculas para a comparação. */
  private normalizar(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
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
