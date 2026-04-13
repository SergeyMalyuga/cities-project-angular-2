import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {AccessibilityClickDirective} from '../../directives/accessibility-click.directive';
import {logout} from '../../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    AccessibilityClickDirective
  ]
})
export class HeaderComponent {
  private store = inject(Store<AppState>)

  public readonly AppRoute = AppRoute;
  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AuthorizationStatus = AuthorizationStatus;

  public signOut(): void {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(logout());
    }
  }
}
