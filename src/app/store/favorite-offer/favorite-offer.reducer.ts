import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {
  loadFavoriteOffers,
  loadFavoritesOffersFailure,
  loadFavoritesOffersSuccess
} from './actions/favorite-offer.actions';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const favoriteOffersReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, state => ({
    ...state, isLoading: true
  })),
  on(loadFavoritesOffersSuccess, (state, {offers}) =>
    favoriteOfferAdapter.setAll(offers, {...state, isLoading: false, error: null}),
  ),
  on(loadFavoritesOffersFailure, (state, {error}) => ({
    ...state, isLoading: false, error
  }))
)
