import { createEntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { createReducer } from '@ngrx/store';
import { OffersState } from '../../core/models/offers.state';

export const offerAdapter = createEntityAdapter<OfferPreview>();
const initialState = offerAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer<OffersState>(initialState);
