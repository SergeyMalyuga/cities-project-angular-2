import {createAction, props} from '@ngrx/store';
import {Offer, OfferPreview} from '../../../core/models/offers';

export const loadFavoriteOffers = createAction('[App Component] Load Favorite Offers');
export const loadFavoritesOffersSuccess = createAction('[Favorite Offer API] Load Favorite Offers Success',
  props<{ offers: OfferPreview[] }>());
export const loadFavoritesOffersFailure = createAction('[Favorite Offer API] Load Favorite Offers Failure',
  props<{ error: string }>());

export const toggleFavoriteStatus = createAction('[Offer Component] Toggle Favorite Status',
  props<{ offerId: string, isFavorite: boolean }>());
export const toggleFavoriteStatusSuccess = createAction('[Favorite Offer API] Toggle Status Success',
  props<{ offer: Offer }>());
export const toggleFavoriteStatusFailure = createAction('[Favorite Offer API] Toggle Status Failure',
  props<{ error: string }>());
