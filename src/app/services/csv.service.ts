import { Injectable } from '@angular/core';
import { TabelaDados } from '../models/tabela-dados.model';

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  /**
   * Extrai os dados de um arquivo CSV.
   * Suporta separadores ',' ou ';' e campos entre aspas.
   */
  extrair(conteudo: ArrayBuffer): TabelaDados {
    const texto = new TextDecoder('utf-8').decode(conteudo).replace(/^\uFEFF/, '');
    const linhasBrutas = this.parseTexto(texto).filter((l) => l.some((c) => c.trim() !== ''));

    if (linhasBrutas.length === 0) {
      return { colunas: [], linhas: [] };
    }

    const colunas = linhasBrutas[0].map((c) => c.trim());
    const linhas = linhasBrutas.slice(1).map((valores) => {
      const registro: Record<string, string> = {};
      colunas.forEach((coluna, i) => (registro[coluna] = (valores[i] ?? '').trim()));
      return registro;
    });

    return { colunas, linhas };
  }

  private parseTexto(texto: string): string[][] {
    const primeiraLinha = texto.split(/\r?\n/)[0] ?? '';
    const separador = primeiraLinha.split(';').length > primeiraLinha.split(',').length ? ';' : ',';

    const resultado: string[][] = [];
    let linha: string[] = [];
    let campo = '';
    let entreAspas = false;

    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];

      if (entreAspas) {
        if (c === '"' && texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else if (c === '"') {
          entreAspas = false;
        } else {
          campo += c;
        }
      } else if (c === '"') {
        entreAspas = true;
      } else if (c === separador) {
        linha.push(campo);
        campo = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && texto[i + 1] === '\n') i++;
        linha.push(campo);
        resultado.push(linha);
        linha = [];
        campo = '';
      } else {
        campo += c;
      }
    }

    if (campo !== '' || linha.length > 0) {
      linha.push(campo);
      resultado.push(linha);
    }

    return resultado;
  }
}
