import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../app.reducers';
import { Site } from '../../../core/core.model';

@Component({
  selector: 'eaf-postback',
  templateUrl: './postback.component.html',
  styleUrls: ['./postback.component.sass']
})
export class PostbackComponent implements OnInit {

  public addPostbackMode: boolean = false;
  public userSitesState$: Observable<Site[]>;
  constructor(
    private store: Store <fromRoot.State>
  ) { }

  ngOnInit() {
    this.userSitesState$ = this.store.select(fromRoot.getOurSites).map(s => s.filter(e => e.pixelTrackingEnabled));
  }

  onCloseForm($event) {
    this.addPostbackMode = false;
  }

  onAddPostback() {
    this.addPostbackMode = true;
  }
}
