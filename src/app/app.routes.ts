import { Routes } from '@angular/router';
import { LiteraturaComponent } from './pages/literatura/literatura.component';
import { BaseComponent } from './pages/base/base.component';

export const routes: Routes = [
  { path: '', component: BaseComponent, pathMatch: 'full' },

  { path: '**', component: BaseComponent },
];
