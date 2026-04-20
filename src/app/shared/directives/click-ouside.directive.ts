import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() outsideClicked = new EventEmitter();

  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.outsideClicked.emit();
    }
  }
}
