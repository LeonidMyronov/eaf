import { Action } from '@ngrx/store';
import { StatisticPanelFilter,
  Transaction,
  News,
  Coupon,
  Discounts,
  StatisticByDate,
  PixelTrackingEvent,
  Statistic
} from './main.model';
import { Site } from '../../core/core.model';
import { Banner } from '../main/promo/promo.model';

export const BEFORE_FETCH_CONSOLIDATED_DATA = '[MAIN] BEFORE_FETCH_CONSOLIDATED_DATA'; // effect action for fetching consolidated data
export const FETCH_CONSOLIDATED_DATA = '[MAIN] FETCH_CONSOLIDATED_DATA';               // put consolidated data to Store
export const DO_FETCH_STATISTIC = '[MAIN] DO_FETCH_STATISTIC';                         // effect action for fetching all statistic data
export const DO_FETCH_STATISTIC_TABLE = '[MAIN] DO_FETCH_STATISTIC_TABLE';             // effect action for fetching data for table-section
export const FETCH_STATISTIC_TABLE = '[MAIN] FETCH_STATISTIC_TABLE';                   // put statistic-table-section data to Store
export const FETCH_STATISTIC = '[MAIN] FETCH_STATISTIC';                               // put all statistic data to Store
export const DO_FETCH_TRANSACTIONS = '[MAIN] DO_FETCH_TRANSACTIONS';                   // effect action for fetching transactions data for balance page
export const FETCH_TRANSACTIONS = '[MAIN] FETCH_TRANSACTIONS';                         // put transaction data to Store
export const UPDATE_STATISTIC_FILTERS = '[MAIN] UPDATE_STATISTIC_FILTERS';
export const SAVE_STATISTIC_FILTERS = '[MAIN] SAVE_STATISTIC_FILTERS';
export const STATISTIC_QUERY_PARAMS = '[MAIN] STATISTIC_QUERY_PARAMS';
export const DO_FETCH_NEWS = '[MAIN] DO_FETCH_NEWS';                                   // effect action for fetching news
export const FETCH_NEWS = '[MAIN] FETCH_NEWS';
export const DO_FETCH_DISCOUNT_INTRO = '[MAIN] DO_FETCH_DISCOUNT_INTRO';               // effect action for fetching data for Discount page
export const FETCH_DISCOUNT_INTRO = '[MAIN] FETCH_DISCOUNT_INTRO';                     // put data for discount page to store
export const DO_FETCH_DISCOUNT_DETAILS = '[MAIN] DO_FETCH_DISCOUNT_DETAILS';           // effect action for fetching data for discount/details page
export const FETCH_DISCOUNT_DETAILS = '[MAIN] FETCH_DISCOUNT_DETAILS';                 // put data for discount/details page to Store
export const DO_DISCOUNT_REQUEST = '[MAIN] DO_DISCOUNT_REQUEST';                       // effect action for sending discount-request data
export const DO_DISCOUNT_CREATION_REQUEST = '[MAIN] DO_DISCOUNT_CREATION_REQUEST';     // effect action for sending discount-creation-request data
export const SUBMIT_DISCOUNT_REQUEST = '[MAIN] SUBMIT_DISCOUNT_REQUEST';               // action indicates successfull submitting a form
export const BEFORE_FETCH_DAY_STAT = '[MAIN] BEFORE_FETCH_DAY_STAT';                   // effect action for fetching 1-day-statistic data
export const FETCH_DAY_STAT = '[MAIN] FETCH_DAY_STAT';                                 // put 1-day-statistic data to Store
export const FILL_PT_EVENTS_NAMES = '[MAIN] FILL_PT_EVENTS_NAMES';                     // put Pixel-Tracking events names to Store
export const BEFORE_FETCH_PT_EVENTS_DETAILS = '[MAIN] BEFORE_FETCH_PT_EVENTS_DETAILS'; // effect action for fetching PT-data
export const FETCH_PT_EVENTS_DETAILS = '[MAIN] FETCH_PT_EVENTS_DETAILS';               // put PT-data to Store
export const SET_PROMO_SITE_DATA = '[MAIN] SET_PROMO_SITE_DATA';
export const STORE_PROMO_DATA = '[MAIN] STORE_PROMO_DATA';                             // put data for PromoModule to Store
export const UPDATE_PROMO_SBANNER_COUPON = '[MAIN] UPDATE_PROMO_SBANNER_COUPON';
export const UPDATE_PROMO_SBANNER_UTM = '[MAIN] UPDATE_PROMO_SBANNER_UTM';
export const UPDATE_PROMO_ABANNER_COUPON = '[MAIN] UPDATE_PROMO_ABANNER_COUPON';
export const UPDATE_PROMO_ABANNER_UTM = '[MAIN] UPDATE_PROMO_ABANNER_UTM';

export class BeforeFetchConsolidatedData implements Action {
  readonly type = BEFORE_FETCH_CONSOLIDATED_DATA;
}

export class FetchConsolidatedData implements Action {
  readonly type = FETCH_CONSOLIDATED_DATA;
  constructor(public payload: any) {}
}

export class DoFetchStatisticTable implements Action {
  readonly type = DO_FETCH_STATISTIC_TABLE;
  constructor(public payload: {fromDate: Date, toDate: Date, siteId: number, filters?: StatisticPanelFilter[]}) {}
}

export class FetchStatisticTable implements Action {
  readonly type = FETCH_STATISTIC_TABLE;
  constructor(public payload: Statistic[]) {}
}

export class DoFetchStatistic implements Action {
  readonly type = DO_FETCH_STATISTIC;
  constructor(public payload: {fromDate: Date, toDate: Date, siteId: number}) {}
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

export class DoFetchTransactions implements Action {
  readonly type = DO_FETCH_TRANSACTIONS;
  constructor(public payload: {fromDate: Date, toDate: Date, paymentMethodId: number}) {}
}

export class FetchTransactions implements Action {
  readonly type = FETCH_TRANSACTIONS;
  constructor(public payload: Transaction[]) {}
}

export class DoFetchNews implements Action {
  readonly type = DO_FETCH_NEWS;
  constructor(public payload: number) {}
}

export class FetchNews implements Action {
  readonly type = FETCH_NEWS;
  constructor(public payload: {more: boolean, lastFetched: number, news: News[]}) {}
}

export class DoFetchDiscountIntro implements Action {
  readonly type = DO_FETCH_DISCOUNT_INTRO;
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

export class DoDiscountRequest implements Action {
  readonly type = DO_DISCOUNT_REQUEST;
  constructor(public payload: {}) {}
}

export class DoDiscountCreationRequest implements Action {
  readonly type = DO_DISCOUNT_CREATION_REQUEST;
  constructor(public payload: {}) {}
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

export class UpdatePromoSBannerCoupon implements Action {
  readonly type = UPDATE_PROMO_SBANNER_COUPON;
  constructor(public payload: {id: number, coupon: string}) {}
}

export class UpdatePromoSBannerUTM implements Action {
  readonly type = UPDATE_PROMO_SBANNER_UTM;
  constructor(public payload: {id: number, utm: string}) {}
}

export class UpdatePromoABannerCoupon implements Action {
  readonly type = UPDATE_PROMO_ABANNER_COUPON;
  constructor(public payload: {id: number, coupon: string}) {}
}

export class UpdatePromoABannerUTM implements Action {
  readonly type = UPDATE_PROMO_ABANNER_UTM;
  constructor(public payload: {id: number, utm: string}) {}
}

export type MainActions =
  BeforeFetchConsolidatedData |
  FetchConsolidatedData |
  FetchStatistic |
  FetchStatisticTable |
  DoFetchStatisticTable |
  UpdateStatisticFilters |
  SaveStatisticFilters |
  StatisticQueryParams |
  DoFetchTransactions |
  FetchTransactions |
  FetchNews |
  FetchDiscountIntro |
  DoDiscountRequest |
  DoDiscountCreationRequest |
  SubmitDiscountRequest |
  FetchDiscountDetails |
  FetchDayStat |
  BeforeFetchDayStat |
  FillPTEventsNamesList |
  BeforeFetchPTEventsDetails |
  FetchPTEventsDetailsList |
  SetPromoSiteData |
  StorePromoData |
  UpdatePromoSBannerCoupon |
  UpdatePromoSBannerUTM |
  UpdatePromoABannerCoupon |
  UpdatePromoABannerUTM
;

