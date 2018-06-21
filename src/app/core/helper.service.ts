import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducers';
import * as UIActions from '../ui/ui.actions';
@Injectable()
export class HelperService {

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  preventBodyToScroll(scroll: boolean): void {
    const body = document.querySelector('body');
    if (scroll) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }

  convertTimestamp2Days(date: Date): number {
    return Math.round(this.convertTimestamp2Hours(date) / 24);
  }

  convertTimestamp2Hours(date: Date): number {
    return Math.round(date.getDate() / 3600 / 1000);
  }

  onSuccessClipboardCopy() {
    this.store.dispatch(new UIActions.ShowNotification('Text is copied to clipboard'))
  }

}
