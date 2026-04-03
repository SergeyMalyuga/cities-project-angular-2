import {Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectCity, selectOffersByCity} from '../../store/app/selectors/app.selector';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {SelectCityDirective} from '../../shared/directives/select-city.directive';
import {CITY_LOCATIONS} from '../../core/constants/const';
import {NgClass} from '@angular/common';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {ClickOutsideDirective} from '../../shared/directives/click-ouside.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, OfferCardComponent, SelectCityDirective, NgClass, ToggleDirective, ClickOutsideDirective],
})
export class MainComponent {
  private store = inject(Store<AppState>);

  public offers = this.store.selectSignal(selectOffersByCity);
  public currentCity = this.store.selectSignal(selectCity);
  public isOptionsOpen = signal<boolean>(false);
  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public toggleOptions() {
    this.isOptionsOpen.set(!this.isOptionsOpen());
  }

  public closeOptions() {
    if (this.isOptionsOpen()) {
      this.isOptionsOpen.set(false);
    }
  }
}
