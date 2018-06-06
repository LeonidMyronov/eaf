import { Action } from '@ngrx/store';
import { StatisticPanelFilter, Transaction, News, Coupon, Discounts, StatisticByDate, PixelTrackingEvent } from './main.model';
import { Site } from '../../core/core.model';
import { Banner } from '../main/promo/promo.model';

export const FETCH_CONSOLIDATED_DATA = '[MAIN] FETCH_CONSOLIDATED_DATA';
export const FETCH_STATISTIC = '[MAIN] FETCH_STATISTIC';
export const FETCH_TRANSACTIONS = '[MAIN] FETCH_TRANSACTIONS';
export const UPDATE_STATISTIC_FILTERS = '[MAIN] UPDATE_STATISTIC_FILTERS';
export const SAVE_STATISTIC_FILTERS = '[MAIN] SAVE_STATISTIC_FILTERS';
export const STATISTIC_QUERY_PARAMS = '[MAIN] STATISTIC_QUERY_PARAMS';
export const FETCH_NEWS = '[MAIN] FETCH_NEWS';
export const FETCH_DISCOUNT_INTRO = '[MAIN] FETCH_DISCOUNT_INTRO';
export const FETCH_DISCOUNT_DETAILS = '[MAIN] FETCH_DISCOUNT_DETAILS';
export const SUBMIT_DISCOUNT_REQUEST = '[MAIN] SUBMIT_DISCOUNT_REQUEST';
export const FETCH_DAY_STAT = '[MAIN] FETCH_DAY_STAT';
export const BEFORE_FETCH_DAY_STAT = '[MAIN] BEFORE_FETCH_DAY_STAT';
export const FILL_PT_EVENTS_NAMES = '[MAIN] FILL_PT_EVENTS_NAMES';
export const BEFORE_FETCH_PT_EVENTS_DETAILS = '[MAIN] BEFORE_FETCH_PT_EVENTS_DETAILS';
export const FETCH_PT_EVENTS_DETAILS = '[MAIN] FETCH_PT_EVENTS_DETAILS';
export const SET_PROMO_SITE_DATA = '[MAIN] SET_PROMO_SITE_DATA';
export const STORE_PROMO_DATA = '[MAIN] STORE_PROMO_DATA';

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

export class FetchDiscountDetails implements Action {
  readonly type = FETCH_DISCOUNT_DETAILS;
  constructor(public payload: {
    visitorsLastMonth: number;
    uniquesLastMonth: number;
    availableCoupons: number;
    usedCoupons: number;
    sources: string[];
    activeCoupons: Coupon[];
    expiredCoupons: Coupon[],
    totalActiveCoupons: number;
    totalExpiredCoupons: number;
  }) {}
}

export class SubmitDiscountRequest implements Action {
  readonly type = SUBMIT_DISCOUNT_REQUEST;
}

export class FetchDayStat implements Action {
  readonly type = FETCH_DAY_STAT;
  constructor(public payload: {date: Date, totalIncome: number, data: StatisticByDate[]}) {}
}

export class BeforeFetchDayStat implements Action {
  readonly type = BEFORE_FETCH_DAY_STAT;
  constructor(public payload: {date: Date}) {}
}

export class FillPTEventsNamesList implements Action {
  readonly type = FILL_PT_EVENTS_NAMES;
  constructor(public payload: string[]) {}
}

export class BeforeFetchPTEventsDetails implements Action {
  readonly type = BEFORE_FETCH_PT_EVENTS_DETAILS;
  constructor(public payload: {date: Date, eventName: string}) {}
}

export class FetchPTEventsDetailsList implements Action {
  readonly type = FETCH_PT_EVENTS_DETAILS;
  constructor(public payload: PixelTrackingEvent[]) {}
}

export class SetPromoSiteData implements Action {
  readonly type = SET_PROMO_SITE_DATA;
  constructor(public payload: {site: Site, refLink: string}) {}
}

export class StorePromoData implements Action {
  readonly type = STORE_PROMO_DATA;
  constructor(public payload: {coupons: Coupon[], staticBanners: Banner[], animatedBanners: Banner[]}) {}
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
  SubmitDiscountRequest |
  FetchDiscountDetails |
  FetchDayStat |
  BeforeFetchDayStat |
  FillPTEventsNamesList |
  BeforeFetchPTEventsDetails |
  FetchPTEventsDetailsList |
  SetPromoSiteData |
  StorePromoData
;

