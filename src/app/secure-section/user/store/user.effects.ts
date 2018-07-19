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
import { PTEventParamsData } from '../../store/main.model';

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
    // TODO make request to backend
    .map(() => 'Message is sent successefully')
    .debounceTime(500)
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
        },
        {
          type: UIActions.ERASE_FORM,
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
    // TODO make request to backend
    .map(() => 'WithdrawRequest is sent successefully')
    .debounceTime(500)
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
        },
        {
          type: UIActions.ERASE_FORM,
          payload: response
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doSendPixelTrackingEventParams = this.actions$
    .ofType(UserActions.DO_SEND_PIXEL_TRACKING_EVENT_PARAMS)
    .map((action: UserActions.DoSendPixelTrackingEventParams) => action.payload)
    // TODO make request to backend
    .map((r: {id: number, ptEventParamsData: PTEventParamsData}) => {
      return {
        id: r.id,
        ptEventParamsData: [r.ptEventParamsData],
        message: 'Your data have been saved successefully'
      };
    })
    .mergeMap(r => {
      return [
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: r.message
        },
        {
          type: UserActions.SET_PIXEL_TRACKING_EVENT_PARAMS,
          payload: {
            id: r.id,
            ptEventParamsData: r.ptEventParamsData
          }
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doChangePixelTrackingEventStatus = this.actions$
    .ofType(UserActions.DO_CHANGE_PIXEL_TRACKING_EVENT_STATUS)
    .map((action: UserActions.DoChangePixelTrackingEventStatus) => action.payload)
    // TODO make request to backend
    .map(r => {
      return {
        id: r.id,
        ptEventParamsData: [
          {
            id: 2,
            name: 'startedFillOrderForm',
            status: 0,
            method: 1,
            params: 'some test URL and params',
            source: 1
          },
          {
            id: 4,
            name: 'startedFillOrderForm',
            status: 0,
            method: 2,
            params: 'some test URL and params',
            source: 2
          }
        ],
      };
    })
    .map(r => {
      return {
          type: UserActions.SET_PIXEL_TRACKING_EVENT_PARAMS,
          payload: {
            id: r.id,
            ptEventParamsData: r.ptEventParamsData
          }
        };
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doActivatePixelTracking = this.actions$
    .ofType(UserActions.DO_ACTIVATE_PIXEL_TRACKING)
    .map((action: UserActions.DoActivatePixelTracking) => action.payload)
    // TODO check if status the same - don't send request !!!!!!  ======================== !!!! =========================
    // TODO check if status the same - don't send request !!!!!!  ======================== !!!! =========================
    // TODO check if status the same - don't send request !!!!!!  ======================== !!!! =========================
    .map((r: {id: number, status: boolean}) => {
      return {
        id: r.id,
        status: r.status,
        message: 'Your data have been saved successefully'
      };
    })
    .mergeMap(r => {
      return [
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: r.message
        },
        {
          type: UserActions.ACTIVATE_PIXEL_TRACKING,
          payload: {
            id: r.id,
            status: r.status
          }
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });
}
