import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHorizontalComponent } from './components/nav-horizontal/nav-horizontal.component';
import { SubsectionsComponent } from './components/subsections/subsections.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavHorizontalComponent, SubsectionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
