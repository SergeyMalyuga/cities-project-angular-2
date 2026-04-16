import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output,} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {FavoriteOffersService} from '../../../core/services/favorite-offers.service';
import {selectIsFavoriteOffersIsLoading} from '../../../store/favorite-offer/selectors/favorite-offer.selectors';

@Component({
  selector: 'app-offer-card',
  imports: [TitleCasePipe, HoverTrackerDirective, RouterLink],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Output() hovered = new EventEmitter<OfferPreview | null>();
  @Input({ required: true }) offer!: OfferPreview;

  private store = inject(Store<AppState>);
  private favoriteOfferService = inject(FavoriteOffersService);

  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public isFavoriteOfferLoading = this.store.selectSignal(
    selectIsFavoriteOffersIsLoading,
  );

  public onHovered(isHover: boolean): void {
    if (isHover) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }

  public changeFavoriteStatus() {
    this.favoriteOfferService.toggleFavoriteStatus(
      this.offer.id,
      this.offer.isFavorite,
    );
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
