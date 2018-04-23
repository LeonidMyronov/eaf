import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../../core/app-storage.service';

import * as fromRoot from '../../app.reducers';

@Component({
  selector: 'eaf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {
  public isAuth$: Observable<boolean>;

  constructor(
    private appStorage: AppStorageService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

}
