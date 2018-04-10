import { Action } from '@ngrx/store';

export const IS_AUTH = '[AUTH Is Authenticated]';
export const IS_UNAUTH = '[AUTH Is Unuthenticated]';

export class IsAuth implements Action {
  readonly type = IS_AUTH;
}

export class IsUnauth implements Action {
  readonly type = IS_UNAUTH;
}

export type AuthActions = IsAuth | IsUnauth;

