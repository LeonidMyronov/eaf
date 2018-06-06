import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import * as fromRoot from '../../../app.reducers';
import * as UserActions from './user.actions';
import { User } from '../user.model';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  @Effect() updateProfile = this.actions$
    .ofType(UserActions.BEFORE_UPDATE_PROFILE)
    .map((action: UserActions.BeforeUpdateProfile) => {
      return action.payload;
    })
    // .switchMap((params: {}) => {
    //   return this.http.get('api' + params);
    // })
    .switchMap(params => {
      return this.store.select(fromRoot.getUserState).take(1)
      .map(data => {
        return {
          user: {
            ...data.user,
            ...params
          }
        };
      });
    })
    .map((data) => {
      return {
        type: UserActions.FILL_PROFILE,
        payload: data
      };
    });
}

