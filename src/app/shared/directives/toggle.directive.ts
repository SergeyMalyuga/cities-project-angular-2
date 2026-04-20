import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  @Output() toggled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    evt.stopPropagation();
    this.toggled.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      evt.stopPropagation();
      this.toggled.emit();
    } else if (evt.key === 'Escape') {
      this.closed.emit();
    }
  }
}
