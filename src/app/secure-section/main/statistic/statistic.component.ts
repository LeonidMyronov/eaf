import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app.reducers';
import { User } from '../../user/user.model';
@Component({
  selector: 'eaf-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.sass']
})
export class StatisticComponent implements OnInit {
  // public userState$: Observable<{user: User}>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    // this.userState$ = this.store.select(fromRoot.getUserState);
  }

}
