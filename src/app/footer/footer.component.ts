import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';

import { AppStorageService } from '../core/app-storage.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';

@Component({
  selector: 'eaf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: any;
  public userMenu: any;
  public timeList: any;
  public currentTime: number ;
  public isAuth$: Observable<boolean>;
  private timerGenerator$: Observable<Date>;
  private currentTimer$: Observable<string>;
  private homeTimer$: Observable<string>;
  private serverTimer$: Observable<string>;

  constructor(
    private appStorage: AppStorageService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.navMenu = this.appStorage.getNavMenu();
    this.userMenu = this.appStorage.getUserMenu();
    this.timeList = this.appStorage.getTimeList();
    this.currentTime = this.timeList[0];

    this.timerGenerator$ = this.createTimer().map(_ => new Date());
    this.homeTimer$ = this.timerGenerator$.map(date => this.formatTime(date.getHours()) + ':' + this.formatTime(date.getMinutes()));
    this.serverTimer$ = this.timerGenerator$.map(date => `${this.formatTime(date.getUTCHours())}:${this.formatTime(date.getMinutes())}`);
    this.currentTimer$ = this.serverTimer$;
  }


  createTimer() {
    return Observable.timer(0, 60000);
  }

  formatTime(n: number) {
    return n < 10 ? '0' + n : ''  + n;
  }

  onChangeTime(time: any) {
    this.currentTime = time;
    this.currentTimer$ = time.id === 1 ? this.serverTimer$ : this.homeTimer$;
  }
}
