import { Action } from '@ngrx/store';
import { User, StatisticPanelFilterList } from '../user.model';
import { Site } from '../../../core/core.model';

export const FILL_PROFILE = '[USER] FILL_PROFILE';
export const CLEAR_PROFILE = '[USER] CLEAR_PROFILE';
export const BEFORE_UPDATE_PROFILE = '[USER] BEFORE_UPDATE_PROFILE';
export const ADD_FILTERS_LIST = '[USER] ADD_FILTERS_LIST';

export class FillProfile implements Action {
  readonly type = FILL_PROFILE;
  constructor(public payload: {user: User, sites: Site[]}) {}
}

export class ClearProfile implements Action {
  readonly type = CLEAR_PROFILE;
}

export class AddFiltersList implements Action {
  readonly type = ADD_FILTERS_LIST;
  constructor(public payload: StatisticPanelFilterList) {}
}

export class BeforeUpdateProfile implements Action {
  readonly type = BEFORE_UPDATE_PROFILE;
  constructor(public payload: {}) {}
}


export type UserActions = FillProfile | ClearProfile | AddFiltersList | BeforeUpdateProfile;
