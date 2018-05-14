import { Action } from '@ngrx/store';

export const IS_LOGIN_FORM_OPENED = '[UI] IS_LOGIN_FORM_OPENED';
export const IS_SIGNUP_FORM_OPENED = '[UI] IS_SIGNUP_FORM_OPENED';
export const IS_MOBILE_MENU_OPENED = '[UI] IS_MOBILE_MENU_OPENED';
export const SET_LANG = '[UI] SET_LANG';
export const SET_MEDIA_QUERY = '[UI] SET_MEDIA_QUERY';

export class IsLoginFormOpened implements Action {
  readonly type = IS_LOGIN_FORM_OPENED;
  constructor(public payload: boolean) { }
}

export class IsSignupFormOpened implements Action {
  readonly type = IS_SIGNUP_FORM_OPENED;
  constructor(public payload: boolean) { }
}

export class IsMobileMenuOpened implements Action {
  readonly type = IS_MOBILE_MENU_OPENED;
  constructor(public payload: boolean) { }
}

export class SetLang implements Action {
  readonly type = SET_LANG;
  constructor(public payload: string) { }
}

export class SetActiveMediaQuery implements Action {
  readonly type = SET_MEDIA_QUERY;
  constructor(public payload: string) { }
}

export type UIActions =
  IsLoginFormOpened |
  IsSignupFormOpened |
  IsMobileMenuOpened |
  SetLang |
  SetActiveMediaQuery
  ;
