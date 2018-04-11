import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const FILL_PROFILE = '[USER] FILL_PROFILE';
export const CLEAR_PROFILE = '[USER] CLEAR_PROFILE';

export class FillProfile implements Action {
  readonly type = FILL_PROFILE;
  constructor(public payload: User) {}
}

export class ClearProfile implements Action {
  readonly type = CLEAR_PROFILE;
}

export type UserActions = FillProfile | ClearProfile;
