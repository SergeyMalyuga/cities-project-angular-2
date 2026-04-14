import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../../core/constants/const';
import {ReviewsFormComponent} from '../reviews-form/reviews-form.component';

@Component({
  selector: 'app-reviews',
  imports: [
    DatePipe,
    ReviewsFormComponent
  ],
  templateUrl: './reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
  @Input({required: true}) comments!: Comment[];

  private store = inject(Store<AppState>);

  public readonly Math = Math;
  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
