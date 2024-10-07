import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterListComponent, HeaderMenuComponent, MatCardModule], // Importa o CharacterListComponent standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-and-morty-app';
}
