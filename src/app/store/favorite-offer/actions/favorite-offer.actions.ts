import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadFavoriteOffers = createAction('[App Component] Load Favorite Offers');
export const loadFavoritesOffersSuccess = createAction('[Favorite Offer API] Load Favorite Offers Success',
  props<{ offers: OfferPreview[] }>());
export const loadFavoritesOffersFailure = createAction('[Favorite Offer API] Load Favorite Offers Failure',
  props<{ error: string }>());
