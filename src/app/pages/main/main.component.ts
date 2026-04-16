import {Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectCity, selectIsOfferLoading, selectOffersByCity,} from '../../store/app/selectors/app.selector';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {SelectCityDirective} from '../../shared/directives/select-city.directive';
import {CITY_LOCATIONS, SortType} from '../../core/constants/const';
import {NgClass} from '@angular/common';
import {PlacesSortingComponent} from '../../features/places-sorting/places-sorting.component';
import {SortOffersByPipe} from './pipes/sort-offers-by.pipe';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferPreview} from '../../core/models/offers';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    SelectCityDirective,
    NgClass,
    PlacesSortingComponent,
    SortOffersByPipe,
    MapComponent,
    LoaderComponent,
  ],
})
export class MainComponent {
  private store = inject(Store<AppState>);

  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public offers = this.store.selectSignal(selectOffersByCity);
  public currentCity = this.store.selectSignal(selectCity);
  public currentSortType = signal<SortType>(SortType.POPULAR);
  public activeCard = signal<OfferPreview | null>(null);
  public isLoading = this.store.selectSignal(selectIsOfferLoading);

  public changeSort(sortType: SortType) {
    this.currentSortType.set(sortType);
  }

  public changeActiveCard(offer: OfferPreview | null): void {
    this.activeCard.set(offer);
  }
}
