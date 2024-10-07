import { Query, Store, StoreConfig } from '@datorama/akita';
import { ICharacter } from '../types/api-response.type';
import { Injectable } from '@angular/core';

export interface IFavoriteState {
  favorites: ICharacter[];
}

export function createInitialState(): IFavoriteState {
  return {
    favorites: [],
  };
}

@Injectable({ providedIn: 'root' })
export class FavoriteQuery extends Query<IFavoriteState> {
  constructor(protected favoriteStore: FavoriteStore) {
    super(favoriteStore);
  }

  //   getFavorites() {
  //   return this.getValue().favorites;
  // }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favorites' })
export class FavoriteStore extends Store<IFavoriteState> {
  constructor() {
    super(createInitialState());
  }



  addFavorite(character: ICharacter) {
    this.update((state) => {
      console.log('Adding favorite:', character);
      return {
        favorites: [...state.favorites, character],
      };
    });
  }

  removeFavorite(character: ICharacter) {
    this.update((state) => {
      console.log('Removing favorite:', character);
      return {
        favorites: state.favorites.filter((c) => c.id !== character.id),
      };
    });
  }

}
