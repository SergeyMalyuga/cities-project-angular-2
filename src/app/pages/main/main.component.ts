import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectOffersByCity} from '../../store/app/selectors/app.selector';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, OfferCardComponent],
})
export class MainComponent {
  private store = inject(Store<AppState>);
  public offers = this.store.selectSignal(selectOffersByCity);
}
