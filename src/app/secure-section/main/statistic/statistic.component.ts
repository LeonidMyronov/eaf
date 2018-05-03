import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../../../core/app-storage.service';

import * as fromMain from '../../store/main.reducer';
@Component({
  selector: 'eaf-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.sass']
})
export class StatisticComponent implements OnInit {
  public consolidatedState$: Observable<any>;
  private sitesList: any[];
  constructor(
    private store: Store<fromMain.MainState>,
    private appStorage: AppStorageService
  ) { }

  ngOnInit() {
    this.sitesList = this.appStorage.getAllSites();
    this.consolidatedState$ = this.store.select(fromMain.getConsolidatedData);
  }

}
