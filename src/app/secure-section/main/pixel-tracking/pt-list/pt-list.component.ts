import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../app.reducers';
import { Site } from '../../../../core/core.model';

@Component({
  selector: 'eaf-pt-list',
  templateUrl: './pt-list.component.html',
  styleUrls: ['./pt-list.component.sass']
})
export class PtListComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  public userSitesState$: Observable<Site[]>;
  constructor(
    private store: Store <fromRoot.State>
  ) { }

  ngOnInit() {
    this.userSitesState$ = this.store.select(fromRoot.getOurSites).map(s => s.filter(e => !e.pixelTrackingEnabled));
  }

  onCloseForm() {
    this.close.emit(true);
  }

  onClickSite(index: number) {
    console.log(index);
  }

}
