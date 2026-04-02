import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectCity, selectOffersByCity} from '../../store/app/selectors/app.selector';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {SelectCityDirective} from '../../shared/directives/select-city.directive';
import {CITY_LOCATIONS} from '../../core/constants/const';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, OfferCardComponent, SelectCityDirective, NgClass],
})
export class MainComponent {
  private store = inject(Store<AppState>);
  public offers = this.store.selectSignal(selectOffersByCity);
  public currentCity = this.store.selectSignal(selectCity);
  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;
}
