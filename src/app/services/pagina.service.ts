import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginaService {
  private readonly paginaSubject = new BehaviorSubject<string>('literatura');

  /** Página atualmente selecionada, emitida sempre que muda. */
  readonly pagina$: Observable<string> = this.paginaSubject.asObservable();

  selecionar(pagina: string): void {
    this.paginaSubject.next(pagina);
  }
}
