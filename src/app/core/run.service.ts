import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';

@Injectable()
export class RunService {
  private lang = 'ru';

  constructor(
    private store: Store<fromRoot.State>
  ) {
      this.setLang();
  }

  setLang() {
    this.store.dispatch(new UIAction.SetLang(this.lang));
  }
}
