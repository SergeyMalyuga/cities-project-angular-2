import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../constants/const';
import {toggleFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoriteOffersService {
  private store = inject(Store<AppState>);
  private authStatus = this.store.selectSignal(selectAuthStatus);
  private router = inject(Router);

  public toggleFavoriteStatus(offerId: string, isFavorite: boolean) {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(toggleFavoriteStatus({offerId, isFavorite: !isFavorite}));
    } else {
      this.router.navigate(['/login']);
    }
  }
}
