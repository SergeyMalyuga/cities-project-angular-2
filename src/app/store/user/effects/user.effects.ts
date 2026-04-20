import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../../core/services/token.service';
import * as FavoriteOffers from '../../favorite-offer/actions/favorite-offer.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private tokenService = inject(TokenService);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuth),
      switchMap(() => {
        const token = this.tokenService.getToken();
        if (token) {
          return this.userService.checkAuthStatus().pipe(
            map((user) => UserActions.checkAuthSuccess({ user })),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.checkAuthFailure({ error: error.message })),
            ),
          );
        }
        return of(UserActions.checkAuthFailure({ error: 'No token' }));
      }),
    ),
  );

  public authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuthSuccess),
      map(() => FavoriteOffers.loadFavoriteOffers()),
    ),
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ credentials }) =>
        this.userService
          .login({ email: credentials.email, password: credentials.password })
          .pipe(
            tap((user) => this.tokenService.setToken(user.token)),
            map((user) => UserActions.loginSuccess({ user })),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.loginFailure({ error: error.message })),
            ),
          ),
      ),
    ),
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userService.logout().pipe(
          tap(() => this.tokenService.removeToken()),
          map(() => UserActions.logoutSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.logoutFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
