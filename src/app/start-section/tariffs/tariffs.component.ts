import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HelperService } from '../../core/helper.service';

import * as fromRoot from '../../app.reducers';
import * as UIAction from '../../ui/ui.actions';

@Component({
  selector: 'eaf-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.sass']
})
export class TariffsComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.State>,
    private helper: HelperService
  ) { }

  ngOnInit() {
    // TODO
    // pass static data to the AppStorageService
    // fetch them here
  }

  onRegister() {
    this.store.dispatch(new UIAction.IsSignupFormOpened(true));
    this.helper.preventBodyToScroll(true);
  }
}
