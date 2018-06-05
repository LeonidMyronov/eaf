import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MainStorageService } from '../../services/main-storage.service';

import * as fromRoot from '../../../app.reducers';
import { Site } from '../../../core/core.model';
import { RefPage } from '../../store/main.model';

@Component({
  selector: 'eaf-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.sass']
})
export class OfferComponent implements OnInit {
  public siteState$: Observable<Site[]>;
  public userId$: Observable<number>;
  public refPages: RefPage[];
  public selectedRefPage: RefPage;
  constructor(
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService
  ) { }

  ngOnInit() {
    this.refPages = this.mainStorage.getRefPages();
    this.selectedRefPage = this.refPages[0];
    this.siteState$ = this.store.select(fromRoot.getOurSites);
    this.userId$ = this.store.select(fromRoot.getShortUserState).map(response => response.id);
    // .subscribe(response => console.log(response));

  }

  onChangeRefPage(item: RefPage) {
    this.selectedRefPage = item;
  }

  getUrlEnc(str: string): string {
    return encodeURIComponent(str);
  }
}
