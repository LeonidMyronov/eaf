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
  StatisticPanelFilter
} from './main.model';
import { MainActions, FETCH_CONSOLIDATED_DATA, FETCH_STATISTIC, UPDATE_STATISTIC_FILTERS, SAVE_STATISTIC_FILTERS } from './main.actions';

export interface MainState {
  totalIncomeAmount: number;
  rebillsAmount: number;
  sellsAmount: number;
  uniqueVisitorsAmount: number;
  sources: string[];
  sitesTraffic: SiteTraffic[];
  geoTargets: Country[];
  deviceTypes: DeviceType[];
  news: any[];
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
  news: [],
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
  statistic: null
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
        news: action.payload.news,
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
            f.filterList.forEach( fList => {
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
    news: state.news,
    lastDayIncomes: state.lastDayIncomes,
    lastDayConversions: state.lastDayConversions,
  };
});

export const getStatistic = createSelector(getMainState, (state: MainState) => state.statistic);

