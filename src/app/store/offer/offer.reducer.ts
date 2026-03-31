import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {OffersState} from '../../core/models/offers.state';
import {loadOffers, loadOffersFailure, loadOffersSuccess} from './actions/offer.actions';

export const offerAdapter = createEntityAdapter<OfferPreview>();
const initialState: OffersState = offerAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer<OffersState>(initialState,
  on(loadOffers, state => ({
    ...state, isLoading: true,
  })),
  on(loadOffersSuccess, (state, {offers}) =>
    offerAdapter.setAll(offers, {...state, isLoading: false, error: null}),
  ),
  on(loadOffersFailure, (state, {error}) => ({
    ...state, isLoading: false, error
  }))
);
