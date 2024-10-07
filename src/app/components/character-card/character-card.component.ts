import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICharacter } from '../../types/api-response.type';
import { StateService } from '../../state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  isFavorite = false;
  favorites: any[] = [];
  @Input() character?: ICharacter;
  stateSubscription?: Subscription;

  constructor(
    private readonly stateService: StateService,
   ) { }

  ngOnInit() {
    this.stateSubscription = this.stateService.state$.subscribe((state) => {
      console.log('heyhow');
      this.isFavorite = state.favorites.some(x => x.id === this.character?.id)
    });
  }

  ngOnDestroy() {
    this.stateSubscription?.unsubscribe();
  }

  toggleFavorite() {
    if (this.character) {
      this.stateService.saveFavorites(this.character); // Altera o estado de favoritos
    }
  }
}
