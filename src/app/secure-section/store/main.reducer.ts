import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../app.reducers';
import { SiteTraffic, GeoTarget, DeviceType, Income, Conversion } from './main.model';
import { MainActions, FETCH_CONSOLIDATED_DATA } from './main.actions';

export interface MainState {
  totalIncomeAmount: number;
  rebillsAmount: number;
  sellsAmount: number;
  uniqueVisitorsAmount: number;
  sources: string[];
  sitesTraffic: SiteTraffic[];
  geoTargets: GeoTarget[];
  deviceTypes: DeviceType[];
  news: any[];
  lastDayIncomes: Income[];
  lastDayConversions: Conversion[];
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

