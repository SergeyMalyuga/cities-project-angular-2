import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {ClickOutsideDirective} from '../../shared/directives/click-ouside.directive';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-places-sorting',
  imports: [
    ToggleDirective,
    ClickOutsideDirective,
    NgClass
  ],
  templateUrl: './places-sorting.component.html',
  styleUrl: './places-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesSortingComponent {
  public isOptionsOpen = signal<boolean>(false);

  public toggleOptions() {
    this.isOptionsOpen.set(!this.isOptionsOpen());
  }

  public closeOptions() {
    if (this.isOptionsOpen()) {
      this.isOptionsOpen.set(false);
    }
  }
}
