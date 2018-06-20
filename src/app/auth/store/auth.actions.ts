import { Action } from '@ngrx/store';
import { LoginData } from '../login-data.model';
import { SignupData } from '../signup-data.model';

export const IS_AUTH = '[AUTH Is Authenticated]';
export const IS_UNAUTH = '[AUTH Is Unuthenticated]';
export const DO_LOGIN = '[AUTH DO_LOGIN]';
export const DO_SIGNUP = '[AUTH DO_SIGNUP]';
export const DO_LOGOUT = '[AUTH DO_LOGOUT]';

export class IsAuth implements Action {
  readonly type = IS_AUTH;
}

export class IsUnauth implements Action {
  readonly type = IS_UNAUTH;
}

export class DoLogin implements Action {
  readonly type = DO_LOGIN;
  constructor (public payload: LoginData) {}
}

export class DoSignup implements Action {
  readonly type = DO_SIGNUP;
  constructor (public payload: SignupData) {}
}

export class DoLogout implements Action {
  readonly type = DO_LOGOUT;
}

export type AuthActions = IsAuth | IsUnauth | DoLogin | DoSignup | DoLogout;

