import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { MainService } from '../services/main.service';

import * as MainActions from './main.actions';
import { StatisticByDate } from './main.model';

@Injectable()
export class MainEffects {

  constructor(
    private actions$: Actions,
    private mainService: MainService
  ) {}

  debugger;
  @Effect()
  dayStat = this.actions$
    .ofType(MainActions.BEFORE_FETCH_DAY_STAT)
    .map((action: MainActions.BeforeFetchDayStat) => {
      console.log(action);
      return action.payload;
    })
    .map((params: {date: Date}) => {
      return this.mainService.fetchStatisticByDate(params.date);
    })
    .map((data: {date: Date, data: StatisticByDate[]}) => {
      return {
        type: MainActions.FETCH_DAY_STAT,
        payload: data
      };
    });

}
