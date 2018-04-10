import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const FILL_PROFILE = '[USER] FILL_PROFILE';

export class FillProfile implements Action {
  readonly type = FILL_PROFILE;
  constructor(public payload: User) {}
}

export type UserActions = FillProfile;
