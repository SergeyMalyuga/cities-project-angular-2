import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { favoriteOfferAdapter } from '../favorite-offer.reducer';

const selectFavoriteOfferState =
  createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const favoriteOfferSelectors = favoriteOfferAdapter.getSelectors();

export const selectFavoriteOffersTotal = createSelector(
  selectFavoriteOfferState,
  favoriteOfferSelectors.selectTotal,
);

export const selectIsFavoriteOffersIsLoading = createSelector(
  selectFavoriteOfferState,
  (state) => state.isLoading,
);

export const selectIsFavoriteOffer = (id: string) =>
  createSelector(selectFavoriteOfferState, (state) =>
    state.entities[id]?.isFavorite ? true : false,
  );

export const selectFavoriteOffers = createSelector(
  selectFavoriteOfferState,
  favoriteOfferSelectors.selectAll,
);
