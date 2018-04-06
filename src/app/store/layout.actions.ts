import { Action } from '@ngrx/store';

export const IS_LOGIN_FORM_OPENED = '[LAYOUT] IS_LOGIN_FORM_OPENED';
export const IS_SIGNUP_FORM_OPENED = '[LAYOUT] IS_SIGNUP_FORM_OPENED';

export class IsLoginFormOpened implements Action {
  readonly type = IS_LOGIN_FORM_OPENED;
  constructor(public payload: boolean) { }
}

export class IsSignupFormOpened implements Action {
  readonly type = IS_SIGNUP_FORM_OPENED;
  constructor (public payload: boolean) { }
}

export type LayoutActions = IsLoginFormOpened | IsSignupFormOpened;
