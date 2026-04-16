import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../constants/const';
import {toggleFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {Router} from '@angular/router';
import {OfferPreview} from '../models/offers';

@Injectable({
  providedIn: 'root'
})
export class FavoriteOffersService {
  private store = inject(Store<AppState>);
  private authStatus = this.store.selectSignal(selectAuthStatus);
  private router = inject(Router);

  public toggleFavoriteStatus(offer: OfferPreview) {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(toggleFavoriteStatus({offerId: offer.id, isFavorite: !offer.isFavorite}));
    } else {
      this.router.navigate(['/login']);
    }
  }
}
