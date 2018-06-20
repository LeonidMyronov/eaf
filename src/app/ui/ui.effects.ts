import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import * as UIActions from './ui.actions';

@Injectable()
export class UIEffects {

  constructor(
    private actions$: Actions,
  ) {}

  // @Effect({dispatch: false}) loadingData = this.actions$
  //   .ofType(UIActions.IS_LOADING)
  //   .map((action: UIActions.IsLoading) => {
  //     return action.payload;
  //   })
  //   .do((state: boolean) => {
  //     // this.helperService.preventBodyToScroll(state);
  //   });

}
