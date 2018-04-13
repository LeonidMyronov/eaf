import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HelperService } from '../../core/helper.service';
import { AppStorageService } from '../../core/app-storage.service';

import * as fromRoot from '../../app.reducers';
import * as UIAction from '../../ui/ui.actions';

@Component({
  selector: 'eaf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public homeSection1Cards;
  public homeSection5Cards;
  public countryList;
  public workTypes;
  constructor(
    private appStorage: AppStorageService,
    private store: Store<fromRoot.State>,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.homeSection1Cards = this.appStorage.getHomeSection1Cards();
    this.homeSection5Cards = this.appStorage.getHomeSection5Cards();
    this.countryList = this.appStorage.getCountryList();
    this.workTypes = this.appStorage.getWorkTypes();
  }

  onRegister() {
    this.store.dispatch(new UIAction.IsSignupFormOpened(true));
    this.helper.preventBodyToScroll(true);
  }
}
