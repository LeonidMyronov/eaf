import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../app.reducers';
import * as UserActions from '../../user/store/user.actions';
import { Site } from '../../../core/core.model';

@Component({
  selector: 'eaf-postback',
  templateUrl: './postback.component.html',
  styleUrls: ['./postback.component.sass']
})
export class PostbackComponent implements OnInit {

  public addPostbackMode: boolean = false;
  public ptEventsMode: boolean = false;
  public userSitesState$: Observable<Site[]>;
  public selectedSite: Site = null;

  constructor(
    private store: Store <fromRoot.State>
  ) { }

  ngOnInit() {
    this.userSitesState$ = this.store.select(fromRoot.getOurSites).map(s => s.filter(e => e.pixelTrackingEnabled));
  }

  openPostbackForm() {
    this.addPostbackMode = true;
  }

  closePostbackForm() {
    this.addPostbackMode = false;
  }
  openPTEventsForm() {
    this.ptEventsMode = true;
  }

  closePTEventsForm($event) {
    this.ptEventsMode = false;
  }

  onAddSiteToPostback(e: Site) {
    this.store.dispatch(new UserActions.EnablePixelTracking(e.id));
    this.selectedSite = e;
    this.closePostbackForm();
    this.openPTEventsForm();
  }

  onSubmitPTEvents(e) {
    console.log(e);
  }
}
