import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../../services/main.service';

import * as fromRoot from '../../../app.reducers';
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
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.fetchConsolidatedData();
    this.todayState$ = this.store.select(fromMain.getConsolidatedData);
    this.store.select(fromMain.getConsolidatedData)
      .subscribe(resp => console.log(resp));
  }



}
