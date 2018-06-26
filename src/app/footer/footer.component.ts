import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';

import { AppStorageService } from '../core/app-storage.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';
import { TimeList, NavMenuItem, UserMenuItem } from '../core/core.model';

@Component({
  selector: 'eaf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: NavMenuItem[];
  public userMenu: UserMenuItem[];
  public timeList: TimeList[];
  public currentTime: TimeList ;
  public currentYear: number ;
  public isAuth$: Observable<boolean>;
  public currentTimer$: Observable<string>;
  public serverTimer$: Observable<string>;
  public homeTimer$: Observable<string>;

  private timerGenerator$: Observable<Date>;

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
    this.currentYear = new Date().getFullYear();

    this.timerGenerator$ = this.createTimer().map(_ => new Date());
    this.homeTimer$ = this.timerGenerator$.map(date => this.formatTime(date.getHours()) + ':' + this.formatTime(date.getMinutes()));
    this.serverTimer$ = this.timerGenerator$.map(date => `${this.formatTime(date.getUTCHours())}:${this.formatTime(date.getMinutes())}`);
    this.currentTimer$ = this.serverTimer$;
  }

  // update clocks in the footer
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
