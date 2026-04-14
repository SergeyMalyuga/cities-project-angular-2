import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../../core/constants/const';
import {ReviewsFormComponent} from '../reviews-form/reviews-form.component';
import {NewComment} from '../../core/models/new-comment';
import {SortByDatePipe} from './pipes/sort-by-date.pipe';

@Component({
  selector: 'app-reviews',
  imports: [
    DatePipe,
    ReviewsFormComponent,
    SortByDatePipe
  ],
  templateUrl: './reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
  @Output() submitted = new EventEmitter<NewComment>();
  @Input({required: true}) comments!: Comment[];

  private store = inject(Store<AppState>);

  public readonly Math = Math;
  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AuthorizationStatus = AuthorizationStatus;

  public onSubmitted(comment: NewComment) {
    this.submitted.emit(comment);
  }
}
