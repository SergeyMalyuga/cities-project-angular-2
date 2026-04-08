import {createAction, props} from '@ngrx/store';
import {User} from '../../../core/models/user';

export const checkAuth = createAction('[App Component] Check Auth');
export const checkAuthSuccess = createAction('[User API] Check Auth Success',
  props<{ user: User }>());
export const checkAuthFailure = createAction('[User API] Check Auth Failure',
  props<{ error: string }>());
