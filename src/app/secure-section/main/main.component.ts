import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStorageService } from '../../core/app-storage.service';

import * as fromRoot from '../../app.reducers';

@Component({
  selector: 'eaf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {
  userMenu: any[];
  constructor(
    private appStorage: AppStorageService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.userMenu = this.appStorage.getUserMenu();
    console.log(this.userMenu);
    this.store.select(fromRoot.getIsAuth)
      .subscribe(response => console.log(response));
  }

}
