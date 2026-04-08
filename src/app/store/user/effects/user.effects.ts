import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private tokenService = inject(TokenService);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.checkAuth),
      switchMap(() => {
          const token = this.tokenService.getToken();
          if (token) {
            return this.userService.checkAuthStatus().pipe(map(user => UserActions.checkAuthSuccess({user})),
              catchError((error: HttpErrorResponse) => of(UserActions.checkAuthFailure({error: error.message})))
            )
          }
          return of(UserActions.checkAuthFailure({error: 'No token'}));
        }
      )))
}
