import { Component } from '@angular/core';
import { StateService } from '../../state.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {
  openMenu = false;
  favoriteCount = 0;

  stateSubscription?: Subscription;

  constructor(
    private readonly stateService: StateService,
  ) { }

  ngOnInit() {
    // Carregar o estado inicial do menu
    this.openMenu = this.stateService.isFavoriteView();

    this.stateSubscription = this.stateService.state$.subscribe((state) => {
      this.favoriteCount = state.favorites.length;
    });
  }

  ngOnDestroy() {
    this.stateSubscription?.unsubscribe();
  }

  toggleMenu() {
    this.openMenu = this.stateService.toggleViewMode();
  }

  get selectedView(): string {
    return this.openMenu ? 'favoritos' : 'inicio';
  }
}
