import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteOffersService} from '../../../core/services/favorite-offers.service';
import * as FavoriteOffers from '../actions/favorite-offer.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOffersService = inject(FavoriteOffersService);

  $loadFavoriteOffers$ = createEffect(() => this.actions$
    .pipe(ofType(FavoriteOffers.loadFavoriteOffers), switchMap(() => this.favoriteOffersService.getOffers()
      .pipe(map(offers => FavoriteOffers.loadFavoritesOffersSuccess({offers})),
        catchError((error: HttpErrorResponse) => of(FavoriteOffers.loadFavoritesOffersFailure({error: error.message})))))))
}
