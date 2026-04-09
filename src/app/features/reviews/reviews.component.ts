import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [
    DatePipe
  ],
  templateUrl: './reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
  @Input({required: true}) comments!: Comment[];

  protected readonly Math = Math;
}
