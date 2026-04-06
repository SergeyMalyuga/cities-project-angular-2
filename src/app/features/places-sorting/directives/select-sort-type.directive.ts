import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {SortType} from '../../../core/constants/const';

@Directive({
  selector: '[appSelectSort]',
})
export class SelectSortDirective {
  @Input({required: true}) sortType!: SortType;
  @Output() sortSelected = new EventEmitter<SortType>();

  @HostListener('click')
  onClick() {
    this.sortSelected.emit(this.sortType);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.sortSelected.emit(this.sortType);
    }
  }
}
