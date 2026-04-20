import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';
import { Credentials } from '../../../core/models/credentials';

export const checkAuth = createAction('[App Component] Check Auth');
export const checkAuthSuccess = createAction(
  '[User API] Check Auth Success',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[User API] Check Auth Failure',
  props<{ error: string }>(),
);

export const login = createAction(
  '[Login Component] Login',
  props<{ credentials: Credentials }>(),
);
export const loginSuccess = createAction(
  'p[User API] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction(
  '[User API] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Header Component] Logout');
export const logoutSuccess = createAction('[User API] Logout Success');
export const logoutFailure = createAction(
  '[UserAPI] Logout Failure',
  props<{ error: string }>(),
);
