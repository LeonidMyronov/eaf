import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { LoginData } from './login-data.model';
import { SignupData } from './signup-data.model';
import { User } from '../secure-section/user/user.model';
import * as fromRoot from '../app.reducers';
import * as AuthAction from './store/auth.actions';
import * as UserAction from '../secure-section/user/store/user.actions';
import * as UIAction from '../ui/ui.actions';

@Injectable()
export class AuthService {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  login(loginData: LoginData) {
    const id = Math.round(Math.random() * 10000);
    const user: User = {
      email: loginData.email,
      id: id,
      name: 'user_' + id,
      icqAccount: id,
      skypeAccount: 'skype' + id,
      balance: 0
    };
    this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...

    // TODO on success
  this.router.navigate(['/main']);
    this.store.dispatch(new UserAction.FillProfile(user));

    // TODO handle server errors
    // do code here ...
  }

  signup(loginData: SignupData) {
    const id = Math.round(Math.random() * 10000);
    const user: User = {
      email: loginData.email,
      id: id,
      name: 'user_' + id,
      icqAccount: id,
      skypeAccount: 'skype' + id,
      balance: 0
    };
    this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...

    // TODO on success
    this.router.navigate(['/main']);
    this.store.dispatch(new UserAction.FillProfile(user));

    // TODO handle server errors
    // do code here ...
  }

  logout() {
    this.store.dispatch(new AuthAction.IsUnauth());
    this.store.dispatch(new UserAction.ClearProfile());
    this.router.navigate(['/']);
  }
}
