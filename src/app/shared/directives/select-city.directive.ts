import {Directive, EventEmitter, HostListener, inject, Input, Output,} from '@angular/core';
import {City} from '../../core/models/city';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {changeCity} from '../../store/city/actions/city.actions';

@Directive({
  selector: '[appSelectCity]',
})
export class SelectCityDirective {
  @Input({ required: true }) city!: City;
  @Output() citySelected = new EventEmitter<void>();

  private store = inject(Store<AppState>);

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    evt.preventDefault();
    this.store.dispatch(changeCity({ city: this.city }));
    this.citySelected.emit();
  }
}
