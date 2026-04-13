import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ]
})
export class HeaderComponent {
  private store = inject(Store<AppState>)

  public readonly AppRoute = AppRoute;
  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
