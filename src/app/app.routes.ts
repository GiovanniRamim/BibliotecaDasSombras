import { Routes } from '@angular/router';
import { LiteraturaComponent } from './pages/literatura/literatura.component';
import { MidiasComponent } from './pages/midias/midias.component';
import { MusicaComponent } from './pages/musica/musica.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LojasComponent } from './pages/lojas/lojas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'literatura', pathMatch: 'full' },
  { path: 'literatura', component: LiteraturaComponent },
  { path: 'midias', component: MidiasComponent },
  { path: 'musica', component: MusicaComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'lojas', component: LojasComponent },
  { path: '**', redirectTo: 'literatura' },
];
