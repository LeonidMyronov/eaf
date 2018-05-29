import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../app.reducers';
import {
  SiteTraffic,
  DeviceType,
  Income,
  Conversion,
  Statistic,
  Country,
  PixelTracking,
  OS,
  Browser,
  StatisticPanelFilter,
  Transaction,
  News,
  Discounts,
  StatisticByDate
} from './main.model';
import {
  MainActions,
  FETCH_CONSOLIDATED_DATA,
  FETCH_STATISTIC,
  UPDATE_STATISTIC_FILTERS,
  SAVE_STATISTIC_FILTERS,
  STATISTIC_QUERY_PARAMS,
  FETCH_TRANSACTIONS,
  FETCH_NEWS,
  FETCH_DISCOUNT_INTRO,
  SUBMIT_DISCOUNT_REQUEST,
  FETCH_DISCOUNT_DETAILS,
  FETCH_DAY_STAT
} from './main.actions';

export interface MainState {
  totalIncomeAmount: number;
  rebillsAmount: number;
  sellsAmount: number;
  uniqueVisitorsAmount: number;
  sources: string[];
  sitesTraffic: SiteTraffic[];
  geoTargets: Country[];
  deviceTypes: DeviceType[];
  lastNews: News;
  lastDayIncomes: Income[];
  lastDayConversions: Conversion[];
  statistic: {
    statistic: Statistic[],
    conversions: Conversion[],
    incomes: Income[],
    pixelTracking: PixelTracking[],
    countries: Country[],
    deviceTypes: DeviceType[],
    os: OS[],
    browsers: Browser[],
    filters: StatisticPanelFilter[],
  };
  statisticQueryParams: {
    fromDate: Date;
    toDate: Date;
    site: SiteTraffic;
  };
  transactions: Transaction[];
  news: {
    more: boolean;
    lastFetched: number;
    news: News[];
  };
  discounts: Discounts;
  statisticByDate: {
    date: Date;
    data: StatisticByDate[]
  };
}


export interface State extends fromRoot.State {
  main: MainState;
}

export const initialState: MainState = {
  totalIncomeAmount: null,
  rebillsAmount: null,
  sellsAmount: null,
  uniqueVisitorsAmount: null,
  sources: [],
  sitesTraffic: [],
  geoTargets: [],
  deviceTypes: [],
  lastNews: null,
  lastDayIncomes: [],
  lastDayConversions: [],
  // statistic: {
  //   statistic: [],
  //   conversions: [],
  //   incomes: [],
  //   pixelTracking: [],
  //   countries: [],
  //   deviceTypes: [],
  //   os: [],
  //   browsers: [],
  //   filters: [],
  // },
  statistic: null,
  statisticQueryParams: null,
  transactions: [],
  news: {
    more: false,
    lastFetched: null,
    news: [],
  },
  discounts: {
    visitorsLastMonth: null,
    uniquesLastMonth: null,
    isRequestSubmitted: false,
    availableCoupons: null,
    usedCoupons: null,
    sources: [],
    activeCoupons: [],
    expiredCoupons: [],
    totalActiveCoupons: null,
    totalExpiredCoupons: null,
  },
  statisticByDate: {
    date: null,
    data: []
  },
};


export function mainReducer(state: MainState = initialState, action: MainActions) {
  switch (action.type) {
    case FETCH_CONSOLIDATED_DATA:
      return {
        ...state,
        totalIncomeAmount: action.payload.totalIncomeAmount,
        rebillsAmount: action.payload.rebillsAmount,
        sellsAmount: action.payload.sellsAmount,
        uniqueVisitorsAmount: action.payload.uniqueVisitorsAmount,
        sources: action.payload.sources,
        sitesTraffic: action.payload.sitesTraffic,
        geoTargets: action.payload.geoTargets,
        deviceTypes: action.payload.deviceTypes,
        lastNews: action.payload.lastNews,
        lastDayIncomes: action.payload.lastDayIncomes,
        lastDayConversions: action.payload.lastDayConversions,
      };
    case FETCH_STATISTIC:
      return {
        ...state,
        statistic: action.payload
      };
    case UPDATE_STATISTIC_FILTERS:
      return {
        ...state,
        statistic: {
          ...state.statistic,
          filters: state.statistic.filters.map(f => {
            if (f.name !== action.payload.name) {
              return f;
            }
            f.filterList.forEach(fList => {
              if (fList.name === action.payload.filterList[0].name) {
                fList.enabled = action.payload.filterList[0].enabled;
              }
            });
            return {
              name: f.name,
              filterList: f.filterList
            };
          })
        }
      };
    case SAVE_STATISTIC_FILTERS:
      return {
        ...state,
        statistic: {
          ...state.statistic,
          filters: state.statistic.filters.map(f => {
            const income_f = action.payload.find(el => f.name === el.name);
            if (income_f) {
              return {
                name: f.name,
                filterList: f.filterList.map(fList => {
                  const income_fList = income_f.filterList.find(i_el => fList.name === i_el.name);
                  if (income_fList) {
                    return {
                      name: fList.name,
                      enabled: income_fList.enabled
                    };
                  } else {
                    return fList;
                  }
                })
              };
            } else {
              return f;
            }
          })
        }
      };
    case STATISTIC_QUERY_PARAMS:
      return {
        ...state,
        statisticQueryParams: action.payload
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case FETCH_NEWS:
      return {
        ...state,
        news: {
          news: [...state.news.news, ...action.payload.news],
          more: action.payload.more,
          lastFetched: action.payload.lastFetched
        }
      };
    case FETCH_DISCOUNT_INTRO:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          uniquesLastMonth: action.payload.uniquesLastMonth,
          visitorsLastMonth: action.payload.visitorsLastMonth
        }
      };
    case FETCH_DISCOUNT_DETAILS:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          ...action.payload
        }
      };
    case SUBMIT_DISCOUNT_REQUEST:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          isRequestSubmitted: true
        }
      };
    case FETCH_DAY_STAT:
      return {
        ...state,
        statisticByDate: action.payload
      };
    default:
      return state;
  }
}

export const getMainState = createFeatureSelector<MainState>('main');

export const getConsolidatedData = createSelector(getMainState, (state: MainState) => {
  return {
    totalIncomeAmount: state.totalIncomeAmount,
    rebillsAmount: state.rebillsAmount,
    sellsAmount: state.sellsAmount,
    uniqueVisitorsAmount: state.uniqueVisitorsAmount,
    sources: state.sources,
    sitesTraffic: state.sitesTraffic,
    geoTargets: state.geoTargets,
    deviceTypes: state.deviceTypes,
    lastNews: state.lastNews,
    lastDayIncomes: state.lastDayIncomes,
    lastDayConversions: state.lastDayConversions,
  };
});

export const getStatistic = createSelector(getMainState, (state: MainState) => state.statistic);
export const getStatisticQueryParams = createSelector(getMainState, (state: MainState) => state.statisticQueryParams);
export const getTransactions = createSelector(getMainState, (state: MainState) => state.transactions);
export const getNews = createSelector(getMainState, (state: MainState) => state.news);
export const getDiscounts = createSelector(getMainState, (state: MainState) => state.discounts);
export const getStatisticByDate = createSelector(getMainState, (state: MainState) => state.statisticByDate);

