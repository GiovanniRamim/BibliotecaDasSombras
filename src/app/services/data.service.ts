import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TabelaDados } from '../models/tabela-dados.model';
import { CSVService } from './csv.service';
import { ODSService } from './ods.service';
import { XLSXService } from './xlsx.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private csvService: CSVService,
    private xlsxService: XLSXService,
    private odsService: ODSService,
  ) {}

  /**
   * Extrai os dados de uma planilha local, identificando o tipo pela extensão do path.
   * Retorna uma Promise com colunas e linhas para mapeamento no componente.
   */
  extrair(path: string): Promise<TabelaDados> {
    const extensao = this.obterExtensao(path);
    const servico = this.obterServico(extensao);

    if (!servico) {
      return Promise.reject(new Error(`Formato de planilha não suportado: .${extensao}`));
    }

    return firstValueFrom(this.http.get(path, { responseType: 'arraybuffer' })).then((conteudo) =>
      servico(conteudo),
    );
  }

  private obterExtensao(path: string): string {
    const semQuery = path.split('?')[0];
    return (semQuery.split('.').pop() ?? '').toLowerCase();
  }

  private obterServico(extensao: string): ((conteudo: ArrayBuffer) => TabelaDados) | null {
    switch (extensao) {
      case 'csv':
        return (c) => this.csvService.extrair(c);
      case 'xlsx':
        return (c) => this.xlsxService.extrair(c);
      case 'ods':
        return (c) => this.odsService.extrair(c);
      default:
        return null;
    }
  }
}
