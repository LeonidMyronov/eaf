import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app.reducers';
import { User } from '../../user/user.model';
@Component({
  selector: 'eaf-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.sass']
})
export class TodayComponent implements OnInit {
  public userState$: Observable<{user: User}>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.userState$ = this.store.select(fromRoot.getUserState);
    this.store.select(fromRoot.getUserState)
      .subscribe(resp => console.log(resp));
  }



}
