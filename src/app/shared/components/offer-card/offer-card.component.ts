import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../../core/constants/const';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe,
    HoverTrackerDirective,
    RouterLink
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Output() hovered = new EventEmitter<OfferPreview | null>();
  @Input({required: true}) offer!: OfferPreview;
  protected readonly Math = Math;

  public onHovered(isHover: boolean): void {
    if (isHover) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }

  protected readonly AppRoute = AppRoute;
}
