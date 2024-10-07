import { Component } from '@angular/core';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { ApiService } from '../../services/api.service';
import { IApiResponse, ICharacter } from '../../types/api-response.type';
import { FavoriteQuery } from '../../stores/favorite.store';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StateService } from '../../state.service';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DebounceService } from '../../utils/debounce.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCardComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule], // Importando o componente de card
  providers: [ApiService, FavoriteQuery, DebounceService],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent {
  response?: IApiResponse<ICharacter>;
  favorites: ICharacter[] = [];
  menuFavorite = false;
  page: number = 1;
  favoriteCount = 0;
  openMenu = false;
  searchName = '';

  get isLastPage() {
    const totalPages = this.response?.info.pages ?? 1;

    return totalPages <= this.page;
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly stateService: StateService,
    private readonly debounceService: DebounceService,
  ) {
    this.debounceService.debounce(() => this.loadCharacters(), 500);
  }

  ngOnInit() {
    this.stateService.state$.subscribe((state) => {
      this.favorites = state.favorites || [];
      this.menuFavorite = state.isFavoriteView;
    });

    this.loadCharacters();
  }

  loadCharacters() {
    this.apiService
      .searchCharacter(this.searchName, this.page)
      .pipe(catchError((response: HttpErrorResponse) => {
        this.response = {
          info: this.response?.info!,
          results: [],
        };

        return throwError(() => new Error(`No results`));
      }))
      .subscribe((result) => {
        this.response = result;
      });
  }

  onSearchNameChange(event: string) {
    this.searchName = event;

    // Reset pagination
    this.page = 1;

    this.debounceService.trigger(event);
  }

  loadFavorites() {
    this.favorites = this.stateService.getFavorites();
  }

  toggleMenu() {
    this.openMenu = this.stateService.toggleViewMode();
  }

  nextPage() {
    this.page++;

    this.loadCharacters();
  }

  previousPage() {
    if (this.page > 1) this.page--;

    this.loadCharacters();
  }
}
