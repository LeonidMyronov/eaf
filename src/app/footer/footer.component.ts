import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
  public isAuth$: Observable<boolean>;

  constructor(
    private appStorage: AppStorageService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.navMenu = this.appStorage.getNavMenu();
    this.userMenu = this.appStorage.getUserMenu();
  }

}
