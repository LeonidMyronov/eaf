import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';

import * as fromRoot from '../app.reducers';
import * as UIActions from '../ui/ui.actions';

// temp for env=dev
// import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class RunService {
  private lang = 'ru';

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {
      this.setLang();
      // TODO
      // read cookie params to define whether user was logged in
      // gather this info and dispatch
      // auth = true
      // fill user profile

      // temp for env=dev
      // this.store.dispatch(new AuthActions.DoLogin({email: 'test@t.t', password: ''}));
  }

  setLang() {
    this.store.dispatch(new UIActions.SetLang(this.lang));
  }
}
