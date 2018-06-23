import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { MainService } from '../services/main.service';
import { PromoStorageService } from '../main/promo/services/promo-storage.service';
import { HelperService } from '../../core/helper.service';

import * as MainActions from './main.actions';
import * as UIActions from '../../ui/ui.actions';
import { StatisticByDate, PixelTrackingEvent, Coupon } from './main.model';
import { Banner, PromoTheme, PromoCalc } from '../main/promo/promo.model';

@Injectable()
export class MainEffects {

  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private promoStorage: PromoStorageService,
    private helperService: HelperService
  ) {}

  @Effect() beforeFetchConsolidatedData = this.actions$
    .ofType(MainActions.BEFORE_FETCH_CONSOLIDATED_DATA)
    .map(_ => this.mainService.fetchConsolidatedData())
    .mergeMap(data => {
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: MainActions.FETCH_CONSOLIDATED_DATA,
          payload: data
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });

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
    .debounceTime(1000)
    .mergeMap((data: {
          coupons: Coupon[],
          staticBanners: Banner[],
          animatedBanners: Banner[],
          wpThemes: PromoTheme[],
          landingThemes: PromoTheme[],
          calculator: PromoCalc,
        }) => {
          const promoData = {...data};
          if (!data.calculator.calcViews || !data.calculator.calcViews.length) {
            promoData.calculator.calcViews = this.promoStorage.getPromoCalcViews();
          }
          if (!data.calculator.calcColSchs || !data.calculator.calcColSchs.length) {
            promoData.calculator.calcColSchs = this.promoStorage.getPromoCalcColorSchemes();
          }
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: MainActions.STORE_PROMO_DATA,
          payload: promoData
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });

  @Effect() doDiscountRequest = this.actions$
    .ofType(MainActions.DO_DISCOUNT_REQUEST)
    .map((action: MainActions.DoDiscountRequest) => action.payload)
    .map(r => 'DiscountRequest is sent successefully')
    .debounceTime(1000)
    .mergeMap(r => {
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: UIActions.IS_LOADING,
          payload: false
        },
        {
          type: MainActions.SUBMIT_DISCOUNT_REQUEST,
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: r
        },
        {
          type: UIActions.ERASE_FORM
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });


  @Effect() doDiscountCreationRequest = this.actions$
    .ofType(MainActions.DO_DISCOUNT_CREATION_REQUEST)
    .map((action: MainActions.DoDiscountCreationRequest) => action.payload)
    .map(r => 'DiscountCreationRequest is sent successefully')
    .debounceTime(1000)
    .mergeMap(r => {
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: UIActions.IS_LOADING,
          payload: false
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: r
        },
        {
          type: UIActions.ERASE_FORM
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });
}
