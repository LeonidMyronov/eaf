import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';

import { AuthService } from '../auth.service';
import { HelperService } from '../../core/helper.service';

import * as AuthActions from './auth.actions';
import * as USerActions from '../../secure-section/user/store/user.actions';
import * as UIActions from '../../ui/ui.actions';
import { LoginData } from '../login-data.model';
import { SignupData } from '../signup-data.model';
import { User } from '../../secure-section/user/user.model';
import { Site } from '../../core/core.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private helper: HelperService
  ) {}

  @Effect() doLogin = this.actions$
    .ofType(AuthActions.DO_LOGIN)
    .map((action: AuthActions.DoLogin) => action.payload)
    // switchMap to BackEnd API
    .switchMap((data: LoginData) => this.authService.login(data))
    // .map(() => Observable.throw('Network error!'))
    .debounceTime(2000)
    .mergeMap((response: {user: User, sites: Site[]}) => {
    // .mergeMap((response: any) => {
      this.router.navigate(['/main']);
      return [
        {
          type: AuthActions.IS_AUTH
        },
        {
          type: UIActions.IS_LOGIN_FORM_OPENED,
          payload: false
        },
        {
          type: USerActions.FILL_PROFILE,
          payload: response
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doSignup = this.actions$
    .ofType(AuthActions.DO_SIGNUP)
    .map((action: AuthActions.DoSignup) => action.payload)
    .map((data: SignupData) => this.authService.signup(data))
    .debounceTime(2000)
    .mergeMap((response: {user: User, sites: Site[]}) => {
      this.router.navigate(['/main']);
      return [
        {
          type: AuthActions.IS_AUTH
        },
        {
          type: UIActions.SHOW_NOTIFICATION,
          payload: 'User successefully signed up'
        },
        {
          type: UIActions.IS_SIGNUP_FORM_OPENED,
          payload: false
        },
        {
          type: USerActions.FILL_PROFILE,
          payload: response
        }
      ];
    })
    .catch(error => {
      return Observable.of(new UIActions.ShowNotification(error.message));
    });

  @Effect() doLogout = this.actions$
    .ofType(AuthActions.DO_LOGOUT)
    // .switchMap( logoot API)
    .debounceTime(2000)
    .mergeMap(() => {
      this.router.navigate(['/']);
      this.helper.preventBodyToScroll(false);
      return [
        {
          type: AuthActions.IS_UNAUTH
        },
        {
          type: USerActions.CLEAR_PROFILE
        },
        {
          type: UIActions.IS_LOADING,
          payload: false
        }
      ];
    });
}
