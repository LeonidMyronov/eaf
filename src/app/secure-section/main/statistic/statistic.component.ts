import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../../../core/app-storage.service';
import { MainService } from '../../services/main.service';

import * as fromMain from '../../store/main.reducer';
import { Statistic } from '../../store/main.model';

@Component({
  selector: 'eaf-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.sass']
})
export class StatisticComponent implements OnInit {
  public consolidatedState$: Observable<any>;
  public statisticState$: Observable<any>;
  public allFiltersForm: FormGroup;
  public statisticTableHeads = [
    'uniques',
    'hits',
    'inquiries',
    'fakes',
    'sales',
    'salesIncome',
    'rebills',
    'rebillsIncome',
    'incomeOn1k',
    'salesOn1k',
    'chargeback',
    'refferers',
    'refferersIncome'];
  private filteredStatisticTableHeads = [];
  private sitesList: any[];
  constructor(
    private store: Store<fromMain.MainState>,
    private appStorage: AppStorageService,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.initAllFiltersForm();
    this.sitesList = this.appStorage.getAllSites();
    this.mainService.fetchStatisticByPeriod();
    this.consolidatedState$ = this.store.select(fromMain.getConsolidatedData);
    this.store.select(fromMain.getStatistic).subscribe(
      (r: any) => {
        r.filters.forEach((menu: any) => {
          if (Array.isArray(menu.filterList)) {
            menu['filterList'].forEach(arrEl => {
              const control = new FormControl(arrEl.enabled);
              this.allFiltersForm.addControl(arrEl.name, control);
            });
          }
        });
        console.log(this.allFiltersForm);
      }
    );
    this.statisticState$ = this.store.select(fromMain.getStatistic);
    this.allFiltersForm.valueChanges.subscribe(r => console.log(r));
  }

  initAllFiltersForm() {
    this.allFiltersForm = new FormGroup({
      // filters: new FormArray([])
    });
  }

  onChangeTableFilter($e, field) {
    if ($e.target.checked) {
      this.filteredStatisticTableHeads = this.filteredStatisticTableHeads.filter(el => el !== field);
    } else {
      this.filteredStatisticTableHeads.push(field);
    }
  }

  getStatisticTableHeads() {
    return this.statisticTableHeads.filter(el => {
      return !this.filteredStatisticTableHeads.some(fel => fel === el);
    });
  }
}
