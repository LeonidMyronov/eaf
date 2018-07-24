import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../core/app-storage.service';

import { LoginData } from './login-data.model';
import { SignupData } from './signup-data.model';
import { User } from '../secure-section/user/user.model';
import * as fromRoot from '../app.reducers';
import * as AuthAction from './store/auth.actions';
import * as UserAction from '../secure-section/user/store/user.actions';
import * as UIAction from '../ui/ui.actions';
import { Site } from '../core/core.model';

@Injectable()
export class AuthService {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private appStorage: AppStorageService
  ) {}

  login(loginData: LoginData): Observable<{user: User, sites: Site[]}> {

    const user: {user: User, sites: Site[]} = this.getFakeUserData(loginData);
    return Observable.of(user);
    // return user;
    // this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...


    // TODO on success
    // debugger;
    // this.router.navigate(['/main']);
    // this.store.dispatch(new UserAction.FillProfile(user)); - moved to login effect

    // TODO handle server errors
    // do code here ...
  }

  signup(loginData: SignupData): {user: User, sites: Site[]} {
    const user: {user: User, sites: Site[]} = this.getFakeUserData(loginData);
    return user;

    // this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...

    // TODO on success
    // this.router.navigate(['/main']);
    // this.store.dispatch(new UserAction.FillProfile(user));

    // TODO handle server errors
    // do code here ...
  }

  logout() {
    // this.store.dispatch(new AuthAction.IsUnauth());
    // this.store.dispatch(new UserAction.ClearProfile());
    // this.router.navigate(['/']);
  }

  getFakeUserData(loginData) {
    const id = Math.round(Math.random() * 10000);
    return {
      user:  {
      email: loginData.email,
      id: id,
      name: 'Leo',
      icqAccount: id,
      skypeAccount: 'skype' + id,
      balance: 100,
      nextWithdrawDate: 24,
      statisticFiltersList: {
        name: 'test',
        statisticFilters: [
          {name: 'os', filterList: [{name: 'windows', enabled: true}]},
          {name: 'browsers', filterList: [{name: 'Chrome', enabled: true}]}
        ]
      },
      registrationDate: new Date(2017, 0, 16),
      lastVisit: new Date(2018, 4, 30),
      surname: 'Myronov',
      jabberAccount: '',
      info: '',
      prefferedPaymentMethod: null,
      paymentNotes: '',
      totalIncome: 1200.50,
    },
      sites: this.appStorage.getAllSites(),
      wl: this.appStorage.getWhiteLabels()
    };
  }
}
