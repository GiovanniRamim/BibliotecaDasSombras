/**
 * Representa os dados extraídos de uma planilha.
 * - colunas: nomes dos cabeçalhos da planilha
 * - linhas: cada linha como um objeto { nomeDaColuna: valor }
 */
export interface TabelaDados {
  colunas: string[];
  linhas: Record<string, string>[];
}
