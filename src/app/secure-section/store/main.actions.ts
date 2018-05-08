import { Action } from '@ngrx/store';
import { StatisticPanelFilter } from './main.model';

export const FETCH_CONSOLIDATED_DATA = '[MAIN] FETCH_CONSOLIDATED_DATA';
export const FETCH_STATISTIC = '[MAIN] FETCH_STATISTIC';
export const UPDATE_STATISTIC_FILTERS = '[MAIN] UPDATE_STATISTIC_FILTERS';
export const SAVE_STATISTIC_FILTERS = '[MAIN] SAVE_STATISTIC_FILTERS';

export class FetchConsolidatedData implements Action {
  readonly type = FETCH_CONSOLIDATED_DATA;
  constructor(public payload: any) {}
}

export class FetchStatistic implements Action {
  readonly type = FETCH_STATISTIC;
  constructor(public payload: any) {}
}

export class UpdateStatisticFilters implements Action {
  readonly type = UPDATE_STATISTIC_FILTERS;
  constructor(public payload: StatisticPanelFilter) {}
}

export class SaveStatisticFilters implements Action {
  readonly type = SAVE_STATISTIC_FILTERS;
  constructor(public payload: StatisticPanelFilter[]) {}
}

export type MainActions =
  FetchConsolidatedData |
  FetchStatistic |
  UpdateStatisticFilters |
  SaveStatisticFilters
;

