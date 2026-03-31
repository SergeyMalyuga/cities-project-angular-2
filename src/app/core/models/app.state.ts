import { OffersState } from './offers.state';
import { UserState } from './user.state';
import { CityState } from './city.state';
import { FavoriteOffersState } from './favorite-offers.state';

export interface AppState {
  /*  favoriteOffers: FavoriteOffersState;
  user: UserState;
  city: CityState;*/
  offers: OffersState;
}
