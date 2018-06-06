import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { MainService } from '../services/main.service';

import * as MainActions from './main.actions';
import { StatisticByDate, PixelTrackingEvent, Coupon } from './main.model';
import { Banner } from '../main/promo/promo.model';

@Injectable()
export class MainEffects {

  constructor(
    private actions$: Actions,
    private mainService: MainService
  ) {}

  @Effect() dayStat = this.actions$
    .ofType(MainActions.BEFORE_FETCH_DAY_STAT)
    .map((action: MainActions.BeforeFetchDayStat) => {
      return action.payload;
    })
    .map((params: {date: Date}) => {
      return this.mainService.fetchStatisticByDate(params.date);
    })
    .map((data: {date: Date, totalIncome: number, data: StatisticByDate[]}) => {
      return {
        type: MainActions.FETCH_DAY_STAT,
        payload: data
      };
    });

  @Effect() ptEventsDetails = this.actions$
    .ofType(MainActions.BEFORE_FETCH_PT_EVENTS_DETAILS)
    .map((action: MainActions.BeforeFetchPTEventsDetails) => {
      return action.payload;
    })
    .map((params: {date: Date, eventName: string}) => {
      return this.mainService.fetchPTEventsDetails(params);
    })
    .map((data: {eventName: string, data: PixelTrackingEvent[]}) => {
      return {
        type: MainActions.FETCH_PT_EVENTS_DETAILS,
        payload: data.data
      };
    });

  @Effect() fetchPromoData = this.actions$
    .ofType(MainActions.SET_PROMO_SITE_DATA)
    .map((action: MainActions.SetPromoSiteData) => {
      return action.payload.site.id;
    })
    .map((id: number) => {
      return this.mainService.fetchPromoData(id);
    })
    .map((data: {coupons: Coupon[], staticBanners: Banner[], animatedBanners: Banner[]}) => {
      return {
        type: MainActions.STORE_PROMO_DATA,
        payload: data
      };
    });

}
