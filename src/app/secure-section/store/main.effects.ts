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
import { StatisticByDate, PixelTrackingEvent, Coupon, Transaction } from './main.model';
import { Banner, PromoTheme, PromoCalc } from '../main/promo/promo.model';
import { NewsState } from '../main/news/news.component';

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
        // TODO make request to backend
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

  @Effect() doFetchStatistic = this.actions$
    .ofType(MainActions.DO_FETCH_STATISTIC)
    .map((action: MainActions.DoFetchStatistic) => action.payload)
        // TODO make request to backend
    .map((data: {fromDate: Date, toDate: Date, siteId: number}) => this.mainService.fetchStatisticByPeriod())
    .debounceTime(500)
    .mergeMap(data => {
      return [
        {
          type: MainActions.FETCH_STATISTIC,
          payload: data
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });
  @Effect() doFetchStatisticTable = this.actions$
    .ofType(MainActions.DO_FETCH_STATISTIC_TABLE)
    .map((action: MainActions.DoFetchStatisticTable) => action.payload)
        // TODO make request to backend
    .map(() => this.mainService.fetchFilteredStatistic())
    .debounceTime(500)
    .mergeMap(r => {
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: MainActions.FETCH_STATISTIC_TABLE,
          payload: r.statistic
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });

  @Effect() doFetchTransactions = this.actions$
    .ofType(MainActions.DO_FETCH_TRANSACTIONS)
    .map((action: MainActions.DoFetchTransactions) => action.payload)
    .map((r) => this.mainService.fetchTransactionsByPeriod(r))
    .debounceTime(500)
    .mergeMap((r: Transaction[]) => {
      this.helperService.preventBodyToScroll(false);
      return [
        {
          type: MainActions.FETCH_TRANSACTIONS,
          payload: r
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
        // TODO make request to backend
    .map((params: {date: Date}) => {
      return this.mainService.fetchStatisticByDate(params.date);
    })
    .debounceTime(500)
    .mergeMap((data: {date: Date, totalIncome: number, data: StatisticByDate[]}) => {
      return [
        {
          type: MainActions.FETCH_DAY_STAT,
          payload: data
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });

  @Effect() ptEventsDetails = this.actions$
    .ofType(MainActions.BEFORE_FETCH_PT_EVENTS_DETAILS)
    .map((action: MainActions.BeforeFetchPTEventsDetails) => {
      return action.payload;
    })
        // TODO make request to backend
    .map((params: {date: Date, eventName: string}) => {
      return this.mainService.fetchPTEventsDetails(params);
    })
    .debounceTime(500)
    .mergeMap((data: {eventName: string, data: PixelTrackingEvent[]}) => {
      return [
        {
          type: MainActions.FETCH_PT_EVENTS_DETAILS,
          payload: data.data
        },
        {
          type: UIActions.IS_LOADING,
          preloader: false
        }
    ];
    });

  @Effect() doFetchNews = this.actions$
    .ofType(MainActions.DO_FETCH_NEWS)
    .map((action: MainActions.DoFetchNews) => action.payload)
    .map((page: number) => this.mainService.fetchNews(page)) // current o next available page with news
    .debounceTime(500)
    .map((r: NewsState) => {
      return {
        type: MainActions.FETCH_NEWS,
        payload: r
      };
    });

  @Effect() fetchPromoData = this.actions$
    .ofType(MainActions.SET_PROMO_SITE_DATA)
    .map((action: MainActions.SetPromoSiteData) => {
      return action.payload.site.id;
    })
    // TODO make request to backend
    .map((id: number) => {
      return this.mainService.fetchPromoData(id);
    })
    .debounceTime(500)
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
    // TODO make request to backend
    .debounceTime(500)
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
          type: UIActions.ERASE_FORM,
          payload: r
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
    // TODO make request to backend
    .debounceTime(500)
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
          type: UIActions.ERASE_FORM,
          payload: r
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });
}
