import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app.reducers';
import { User } from '../../user/user.model';
@Component({
  selector: 'eaf-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.sass']
})
export class TodayComponent implements OnInit, AfterViewInit {
  @ViewChild('graphField') graphField;
  public userState$: Observable<{user: User}>;
  public graphCoord: {};
  public points = '50,180 100,20 150,180 20,80 180,80 50,180 100,20';

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.userState$ = this.store.select(fromRoot.getUserState);
    this.store.select(fromRoot.getUserState)
      .subscribe(resp => console.log(resp));
  }

  ngAfterViewInit() {
    console.log(this.graphField);
    this.graphCoord  = {
      w: this.graphField.nativeElement.clientWidth,
      h: this.graphField.nativeElement.clientHeight,
    };
    setTimeout(_ => {this.points = '50,180 100,20 150,180 20,80 180,80'; }, 3000);
  }

}
