import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-reviews-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reviews-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsFormComponent {
  private formBuilder = inject(FormBuilder);

  public reviewGroup: FormGroup = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50)]],
    rating: ['', [Validators.required]],
  });
}
