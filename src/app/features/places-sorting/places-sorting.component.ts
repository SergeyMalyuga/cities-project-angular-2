import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal,} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {ClickOutsideDirective} from '../../shared/directives/click-ouside.directive';
import {NgClass} from '@angular/common';
import {SortType} from '../../core/constants/const';
import {SelectSortDirective} from './directives/select-sort-type.directive';

@Component({
  selector: 'app-places-sorting',
  imports: [
    ToggleDirective,
    ClickOutsideDirective,
    NgClass,
    SelectSortDirective,
  ],
  templateUrl: './places-sorting.component.html',
  styleUrl: './places-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesSortingComponent {
  @Input({ required: true }) currentSortType!: SortType;
  @Output() sortSelected = new EventEmitter<SortType>();
  protected readonly Object = Object;
  protected readonly SortType = SortType;

  public isOptionsOpen = signal<boolean>(false);

  public toggleOptions() {
    this.isOptionsOpen.set(!this.isOptionsOpen());
  }

  public closeOptions() {
    if (this.isOptionsOpen()) {
      this.isOptionsOpen.set(false);
    }
  }

  public onSortSelected(sortType: SortType) {
    this.sortSelected.emit(sortType);
    this.closeOptions();
  }
}
