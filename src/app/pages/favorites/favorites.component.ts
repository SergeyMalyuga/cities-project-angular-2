import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-favorites',
  imports: [
    HeaderComponent
  ],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {}
