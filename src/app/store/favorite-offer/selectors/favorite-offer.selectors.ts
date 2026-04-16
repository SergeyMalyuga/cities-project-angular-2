import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {favoriteOfferAdapter} from '../favorite-offer.reducer';

const selectFavoriteOfferState = createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const favoriteOfferSelectors = favoriteOfferAdapter.getSelectors();

export const selectFavoriteOffersTotal = createSelector(
  selectFavoriteOfferState,
  favoriteOfferSelectors.selectTotal
);
