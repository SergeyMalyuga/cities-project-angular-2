import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const offersSelectors = offerAdapter.getSelectors();

const selectCityState = createFeatureSelector<AppState['city']>('city');

export const selectOffersByCity = createSelector(
  selectOffersState,
  selectCityState,
  (offersState, cityState) =>
    Object.values(offersState.entities).filter(offer => offer !== undefined)
      .filter(offer => offer.city.name === cityState.name)
);


export const selectCity = createSelector(
  selectCityState,
  city => city
);

export const selectIsOfferLoading = createSelector(
  selectOffersState,
  state => state.isLoading
)
