import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { ROUTER_CANCEL } from '@ngrx/router-store';


import * as UIActions from './ui.actions';

@Injectable()
export class UIEffects {

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}

  // @Effect({dispatch: false}) loadingData = this.actions$
  //   .ofType(UIActions.IS_LOADING)
  //   .map((action: UIActions.IsLoading) => {
  //     return action.payload;
  //   })
  //   .do((state: boolean) => {
  //     // this.helperService.preventBodyToScroll(state);
  //   });

  @Effect({dispatch: false}) routeCancelled$ = this.actions$
    .ofType(ROUTER_CANCEL)
    .do(() => {
      this.router.navigate(['/reload']);
    });

}
