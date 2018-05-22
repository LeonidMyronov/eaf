import { Action } from '@ngrx/store';
import { StatisticPanelFilter, Transaction, News } from './main.model';

export const FETCH_CONSOLIDATED_DATA = '[MAIN] FETCH_CONSOLIDATED_DATA';
export const FETCH_STATISTIC = '[MAIN] FETCH_STATISTIC';
export const FETCH_TRANSACTIONS = '[MAIN] FETCH_TRANSACTIONS';
export const UPDATE_STATISTIC_FILTERS = '[MAIN] UPDATE_STATISTIC_FILTERS';
export const SAVE_STATISTIC_FILTERS = '[MAIN] SAVE_STATISTIC_FILTERS';
export const STATISTIC_QUERY_PARAMS = '[MAIN] STATISTIC_QUERY_PARAMS';
export const FETCH_NEWS = '[MAIN] FETCH_NEWS';
export const FETCH_DISCOUNT_INTRO = '[MAIN] FETCH_DISCOUNT_INTRO';
export const SUBMIT_DISCOUNT_REQUEST = '[MAIN] SUBMIT_DISCOUNT_REQUEST';

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

export class StatisticQueryParams implements Action {
  readonly type = STATISTIC_QUERY_PARAMS;
  constructor(public payload: {}) {}
}

export class FetchTransactions implements Action {
  readonly type = FETCH_TRANSACTIONS;
  constructor(public payload: Transaction[]) {}
}

export class FetchNews implements Action {
  readonly type = FETCH_NEWS;
  constructor(public payload: {more: boolean, lastFetched: number, news: News[]}) {}
}

export class FetchDiscountIntro implements Action {
  readonly type = FETCH_DISCOUNT_INTRO;
  constructor(public payload: {visitorsLastMonth: number,  uniquesLastMonth: number}) {}
}

export class SubmitDiscountRequest implements Action {
  readonly type = SUBMIT_DISCOUNT_REQUEST;
}

export type MainActions =
  FetchConsolidatedData |
  FetchStatistic |
  UpdateStatisticFilters |
  SaveStatisticFilters |
  StatisticQueryParams |
  FetchTransactions |
  FetchNews |
  FetchDiscountIntro |
  SubmitDiscountRequest
;

