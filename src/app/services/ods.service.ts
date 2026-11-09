import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { TabelaDados } from '../models/tabela-dados.model';
import { XLSXService } from './xlsx.service';

@Injectable({
  providedIn: 'root',
})
export class ODSService {
  constructor(private xlsxService: XLSXService) {}

  /**
   * Extrai os dados da primeira aba de um arquivo ODS (OpenDocument Spreadsheet).
   */
  extrair(conteudo: ArrayBuffer): TabelaDados {
    const workbook = XLSX.read(conteudo, { type: 'array' });
    return this.xlsxService.primeiraAbaParaTabela(workbook);
  }
}
