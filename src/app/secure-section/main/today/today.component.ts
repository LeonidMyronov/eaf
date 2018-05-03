import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromMain from '../../store/main.reducer';
import { User } from '../../user/user.model';

@Component({
  selector: 'eaf-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.sass']
})
export class TodayComponent implements OnInit {
  public todayState$: Observable<any>;

  constructor(
    private store: Store<fromMain.State>,
  ) { }

  ngOnInit() {
    this.todayState$ = this.store.select(fromMain.getConsolidatedData);
    // this.store.select(fromMain.getConsolidatedData)
    //   .subscribe(resp => console.log(resp));
  }



}
