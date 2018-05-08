import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AppStorageService } from '../../../core/app-storage.service';
import { MainService } from '../../services/main.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as UserAction from '../../user/store/user.actions';
import * as MainAction from '../../store/main.actions';
import { Statistic, StatisticFilter, StatisticPanelFilter } from '../../store/main.model';
import { StatisticPanelFilterList } from '../../user/user.model';

@Component({
  selector: 'eaf-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.sass']
})
export class StatisticComponent implements OnInit, OnDestroy {
  public consolidatedState$: Observable<any>;
  public statisticState$: Observable<any>;
  public userStatisticPanelFilters: StatisticPanelFilterList;
  public allFiltersForm: FormGroup;
  public saveFiltersListForm: FormGroup;
  public allFilters: StatisticPanelFilter[];
  public selectedAllFilters: StatisticPanelFilter[];
  public filtersActions = {
    save: false,
    update: false,
    rename: false
  };
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
    // this.selectedAllFiltersForm = [];
    this.initForms();
    this.sitesList = this.appStorage.getAllSites();
    this.consolidatedState$ = this.store.select(fromMain.getConsolidatedData);

    this.store.select(fromMain.getStatistic).subscribe(
      (r: any) => {
        if (!r) {
          this.mainService.fetchStatisticByPeriod();
          return;
        }
        console.log('statistic State => ', r);
        this.allFilters = r.filters;
        // this.selectedAllFilters = [...this.fillSelectedAllFilters([...this.allFilters])];
        // console.log('selectedAllFiltersForm => ', this.selectedAllFilters);
        console.log('allFilters => ', this.allFilters);
        this.fillAllFiltersForm();
        this.selectedAllFilters = this.fillSelectedAllFilters(this.allFiltersForm.value);
        console.log('selectedAllFilters => ', this.selectedAllFilters);
        // console.log(this.allFiltersForm);
      }
    );
    this.statisticState$ = this.store.select(fromMain.getStatistic);

    this.allFiltersForm.valueChanges.subscribe(
      formState => {
        this.selectedAllFilters = this.fillSelectedAllFilters(formState);
        console.log('selectedAllFilters => ', this.selectedAllFilters);
      });
    // setTimeout( _ => this.updateAllFiltersForm(), 3000);

    this.store.select(fromRoot.getUserStatisticFilters)
      .subscribe( (response: StatisticPanelFilterList) => {
        this.userStatisticPanelFilters = response;
        console.log('userStatisticPanelFilters => ', this.userStatisticPanelFilters);
      });
  }

  initForms() {
    this.initSaveFiltersListForm();
    this.initAllFiltersForm();
  }

  initAllFiltersForm() {
    this.allFiltersForm = new FormGroup({
    });
  }

  fillAllFiltersForm() {
    this.allFilters.forEach((menu: any) => {
      if (Array.isArray(menu.filterList)) {
        const groupControl = new FormGroup({});
        menu['filterList'].forEach(arrEl => {
          const control = new FormControl(arrEl.enabled);
          groupControl.addControl(arrEl.name, control);
        });
        this.allFiltersForm.addControl(menu.name, groupControl);
      }
    });
  }

  initSaveFiltersListForm() {
    this.saveFiltersListForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onSaveFiltersListSubmit() {
    const userStatisticPanelFilter: StatisticPanelFilterList = {
      name: this.saveFiltersListForm.value.name,
      statisticFilters: this.selectedAllFilters
    };
    this.store.dispatch(new UserAction.AddFiltersList(userStatisticPanelFilter));
  }

  updateAllFilters(arr: StatisticPanelFilter[]) {
    this.onResetSelectedFilter();
    arr.forEach(f => {
      f.filterList.forEach(fList => {
        this.allFiltersForm.get(f.name).get(fList.name).patchValue(fList.enabled);
      });
    });
  }

  // fillSelectedAllFilters(allFilters: StatisticPanelFilter[]): StatisticPanelFilter[] {
  //   const tempallFilters = [...allFilters];
  //   tempallFilters.forEach(
  //     (fObj: StatisticPanelFilter) => {
  //       fObj.filterList = [...fObj.filterList];
  //       fObj.filterList = fObj.filterList.filter((fEl: StatisticFilter) => fEl.enabled === true);
  //     }
  //   );
  //   return tempallFilters.filter((fObj: StatisticPanelFilter) => fObj.filterList.length);
  // }

  fillSelectedAllFilters(formState) {
    let tempArr = [];
    createStructure();
    removeEmptyArrObects();

    function createStructure() {
      for (const menuProp of Object.keys(formState)) {
        const obj = {name: menuProp, filterList: []};
        for (const el in formState[menuProp]) {
          if (formState[menuProp][el]) {
            obj.filterList.push({name: el, enabled: true});
          }
        }
        tempArr.push(obj);
      }
    }

    function removeEmptyArrObects() {
      tempArr = tempArr.filter(el => el.filterList.length);
    }
    return [...tempArr];
  }

  getSelectedFormFields(): number {
    if (!this.selectedAllFilters || !this.selectedAllFilters.length) {
      return 0;
    }
    let count = 0;
    this.selectedAllFilters.forEach(el => count += el.filterList.length);
    return count;
  }

  getSelectedFormFieldsInMenu(menuName: string): boolean {
    if (!this.selectedAllFilters || !this.selectedAllFilters.length) {
      return false;
    }
    return this.selectedAllFilters.some(el => el.name === menuName);
  }

  onResetSelectedFilter() {
    this.selectedAllFilters.forEach(f => {
      f.filterList.forEach(fList => {
        this.allFiltersForm.get(f.name).get(fList.name).patchValue(false);
      });
    });
  }

  // ---- statistic table start -----
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
  // ---- statistic table end -----

  ngOnDestroy() {
    this.store.dispatch(new MainAction.SaveStatisticFilters(this.selectedAllFilters));
  }
}
