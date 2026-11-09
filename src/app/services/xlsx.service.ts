import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { TabelaDados } from '../models/tabela-dados.model';

@Injectable({
  providedIn: 'root',
})
export class XLSXService {
  /**
   * Extrai os dados da primeira aba de um arquivo XLSX.
   */
  extrair(conteudo: ArrayBuffer): TabelaDados {
    const workbook = XLSX.read(conteudo, { type: 'array' });
    return this.primeiraAbaParaTabela(workbook);
  }

  /**
   * Converte a primeira aba de um workbook em TabelaDados.
   * Compartilhado com o ODSService, pois a biblioteca lê ambos os formatos.
   */
  primeiraAbaParaTabela(workbook: XLSX.WorkBook): TabelaDados {
    const nomeAba = workbook.SheetNames[0];
    if (!nomeAba) {
      return { colunas: [], linhas: [] };
    }

    const matriz = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[nomeAba], {
      header: 1,
      defval: '',
      blankrows: false,
    });

    if (matriz.length === 0) {
      return { colunas: [], linhas: [] };
    }

    const colunas = (matriz[0] as unknown[]).map((c) => String(c).trim());
    const linhas = matriz.slice(1).map((valores) => {
      const registro: Record<string, string> = {};
      colunas.forEach((coluna, i) => (registro[coluna] = String((valores as unknown[])[i] ?? '').trim()));
      return registro;
    });

    return { colunas, linhas };
  }
}
