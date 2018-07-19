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
  public selectedSiteId: number = null;

  constructor(
    private store: Store <fromRoot.State>
  ) { }

  ngOnInit() {
    this.userSitesState$ = this.store.select(fromRoot.getOurSites).map(s => s.filter(e => e.pixelTrackingEnabled));
  }

  onChangePTEventsSettings(id: number) {
    this.selectedSiteId = id;
    this.ptEventsMode = true;
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

  onAddSiteToPostback(id: number) {
    this.store.dispatch(new UserActions.EnablePixelTracking(id));
    this.selectedSiteId = id;
    this.closePostbackForm();
    this.openPTEventsForm();
  }

  onPTActivate(id: number, status: true) {
    console.log('ptActivation', id, status);
    this.store.dispatch(new UserActions.DoActivatePixelTracking({id, status}));
  }

  onSubmitPTEvents(e) {
    console.log(e);
  }
}
