import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as UserActions from './user.actions';
import * as UIActions from '../../../ui/ui.actions';
import { User } from '../user.model';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private helper: HelperService
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
    .mergeMap((data) => {
      return [
        {
          type: UserActions.FILL_PROFILE,
          payload: data
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: 'Profile setting is updated successefully.'
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doSendMessage = this.actions$
    .ofType(UserActions.DO_SEND_MESSAGE)
    .map((action: UserActions.DoSendMessage) => action.payload)
    .map(() => 'Message is sent successefully')
    .debounceTime(1000)
    .mergeMap(response => {
      this.helper.preventBodyToScroll(false);
      return [
        {
          type: UIActions.IS_LOADING,
          payload: false
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: response
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doSenWithdrawRequest = this.actions$
    .ofType(UserActions.DO_SEND_WITHDRAW_REQUEST)
    .map((action: UserActions.DoSendWithdrawRequest) => action.payload)
    .map(() => 'WithdrawRequest is sent successefully')
    .debounceTime(1000)
    .mergeMap(response => {
      this.helper.preventBodyToScroll(false);
      return [
        {
          type: UIActions.IS_LOADING,
          payload: false
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: response
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });
}
