import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewComment} from '../../core/models/new-comment';

@Component({
  selector: 'app-reviews-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reviews-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsFormComponent {
  @Output() submitted = new EventEmitter<NewComment>();

  private formBuilder = inject(FormBuilder);

  public reviewGroup: FormGroup = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50)]],
    rating: ['', [Validators.required]],
  });

  public onSubmit() {
    if (this.reviewGroup.valid) {
      const {comment, rating} = this.reviewGroup.value;
      this.submitted.emit({comment, rating});
      this.reviewGroup.reset();
    }
  }
}
