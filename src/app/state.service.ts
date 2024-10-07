import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICharacter } from './types/api-response.type';

interface State {
  favorites: ICharacter[];
  isFavoriteView: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly state: State = { favorites: [], isFavoriteView: false };
  private readonly stateSubject = new BehaviorSubject<State>(this.state);

  public state$ = this.stateSubject.asObservable();

  getFavorites() {
    return this.state.favorites;
  }

  saveFavorites(character: ICharacter) {
    const favorites = this.state.favorites || [];
    const index = favorites.findIndex(fav => fav.id === character.id);

    if (index === -1) {
      this.state.favorites.push(character);
    } else {
      this.state.favorites = favorites.filter(fav => fav.id !== character.id);
    }

    this.stateSubject.next(this.state);
  }

  isFavoriteView() {
    return this.state.isFavoriteView;
  }

  toggleViewMode() {
    this.state.isFavoriteView = !this.state.isFavoriteView;
    this.stateSubject.next(this.state);
    return this.state.isFavoriteView;
  }
}
