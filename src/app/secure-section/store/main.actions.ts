import { Action } from '@ngrx/store';

export const FETCH_CONSOLIDATED_DATA = '[MAIN] FETCH_CONSOLIDATED_DATA';
export const FETCH_STATISTIC = '[MAIN] FETCH_STATISTIC';

export class FetchConsolidatedData implements Action {
  readonly type = FETCH_CONSOLIDATED_DATA;
  constructor(public payload: any) {}
}

export class FetchStatistic implements Action {
  readonly type = FETCH_STATISTIC;
  constructor(public payload: any) {}
}

export type MainActions =
  FetchConsolidatedData |
  FetchStatistic
;

