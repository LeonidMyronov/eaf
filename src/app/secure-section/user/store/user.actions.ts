import { Action } from '@ngrx/store';
import { User, StatisticPanelFilterList } from '../user.model';
import { Site } from '../../../core/core.model';
import { PTEventParamsData } from '../../store/main.model';

export const FILL_PROFILE = '[USER] FILL_PROFILE';
export const CLEAR_PROFILE = '[USER] CLEAR_PROFILE';
export const BEFORE_UPDATE_PROFILE = '[USER] BEFORE_UPDATE_PROFILE';
export const ADD_FILTERS_LIST = '[USER] ADD_FILTERS_LIST';
export const DO_SEND_MESSAGE = '[USER] DO_SEND_MESSAGE';
export const DO_SEND_WITHDRAW_REQUEST = '[USER] DO_SEND_WITHDRAW_REQUEST';
export const ENABLE_PIXEL_TRACKING = '[USER] ENABLE_PIXEL_TRACKING';
export const DO_ACTIVATE_PIXEL_TRACKING = '[USER] DO_ACTIVATE_PIXEL_TRACKING';
export const ACTIVATE_PIXEL_TRACKING = '[USER] ACTIVATE_PIXEL_TRACKING';
export const DO_SEND_PIXEL_TRACKING_EVENT_PARAMS = '[USER] DO_SEND_PIXEL_TRACKING_EVENT_PARAMS'; // send new pt-params from PostBack-form to backend
export const DO_CHANGE_PIXEL_TRACKING_EVENT_STATUS = '[USER] DO_CHANGE_PIXEL_TRACKING_EVENT_STATUS'; // send new event status from PostBack-form to backend
export const SET_PIXEL_TRACKING_EVENT_PARAMS = '[USER] SET_PIXEL_TRACKING_EVENT_PARAMS'; // put new pt-params to Store

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

export class DoSendMessage implements Action {
  readonly type = DO_SEND_MESSAGE;
  constructor(public payload: {}) {}
}

export class DoSendWithdrawRequest implements Action {
  readonly type = DO_SEND_WITHDRAW_REQUEST;
  constructor(public payload: {}) {}
}

export class EnablePixelTracking implements Action {
  readonly type = ENABLE_PIXEL_TRACKING;
  constructor(public payload: number) {}
}
export class DoActivatePixelTracking implements Action {
  readonly type = DO_ACTIVATE_PIXEL_TRACKING;
  constructor(public payload: {id: number, status: boolean}) {}
}

export class ActivatePixelTracking implements Action {
  readonly type = ACTIVATE_PIXEL_TRACKING;
  constructor(public payload: {id: number, status: boolean}) {}
}

export class DoSendPixelTrackingEventParams implements Action {
  readonly type = DO_SEND_PIXEL_TRACKING_EVENT_PARAMS;
  constructor(public payload: {id: number, ptEventParamsData: PTEventParamsData}) {}
}

export class DoChangePixelTrackingEventStatus implements Action {
  readonly type = DO_CHANGE_PIXEL_TRACKING_EVENT_STATUS;
  constructor(public payload: {id: number, event: {id: number, status: number}}) {}
}

export class SetPixelTrackingEventParams implements Action {
  readonly type = SET_PIXEL_TRACKING_EVENT_PARAMS;
  constructor(public payload: {id: number, ptEventParamsData: PTEventParamsData[]}) {}
}


export type UserActions =
  FillProfile |
  ClearProfile |
  AddFiltersList |
  BeforeUpdateProfile |
  DoSendMessage |
  DoSendWithdrawRequest |
  EnablePixelTracking |
  DoActivatePixelTracking |
  ActivatePixelTracking |
  SetPixelTrackingEventParams |
  DoSendPixelTrackingEventParams |
  DoChangePixelTrackingEventStatus
  ;
