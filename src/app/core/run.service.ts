import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';

import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';

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
  }

  setLang() {
    this.store.dispatch(new UIAction.SetLang(this.lang));
  }
}
