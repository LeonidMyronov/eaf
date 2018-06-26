import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { AppStorageService } from '../../../core/app-storage.service';
import { MainService } from '../../services/main.service';
import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as UIActions from '../../../ui/ui.actions';
import * as UserAction from '../../user/store/user.actions';
import * as MainAction from '../../store/main.actions';
import { Statistic, StatisticFilter, StatisticPanelFilter, PixelTracking } from '../../store/main.model';
import { StatisticPanelFilterList } from '../../user/user.model';
import { Site } from '../../../core/core.model';

export interface QueryParams {
  fromDate: Date;
  toDate: Date;
  siteId: number;
  filters?: StatisticPanelFilter[];
}

@Component({
  selector: 'eaf-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.sass']
})

export class StatisticComponent implements OnInit, AfterViewChecked, OnDestroy {
  public consolidatedState$: Observable<any>;
  public statisticState$: Observable<any>;
  public statisticQueryParamsState$: Observable<any>;
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
  public ptData = {
    ptTableHeads: [],
    ptPropCount: {}
  };
  public queryParams: QueryParams;
  public statisticTableHeads: string[];
  public activeMediaQuery: string;
  public isStatisticFiltersVisible: boolean;
  public sitesList: Site[];

  private filteredStatisticTableHeads = [];
  private subs: Subscription[] = [];
  private isPageLoaded: boolean = false;

  constructor(
    private store: Store<fromMain.MainState>,
    private appStorage: AppStorageService,
    private mainService: MainService,
    private helper: HelperService,
    private changeDetector: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.queryParams = this.initQueryParams();
    this.initForms();

    this.subs.push(
      this.store.select(fromRoot.getAllSites)
        .subscribe((response: Site[]) => {
          this.sitesList = response;
        })
    );

    this.consolidatedState$ = this.store.select(fromMain.getConsolidatedData);

    this.subs.push(
      this.store.select(fromRoot.getActiveMediaQuery).subscribe((activeMedia: string) => {
        this.activeMediaQuery = activeMedia;
        this.isStatisticFiltersVisible = (this.activeMediaQuery === 'sm' || this.activeMediaQuery === 'xs') ? false : true;
      })
    );

    this.subs.push(
      this.store.select(fromMain.getStatistic).subscribe(
        (r: any) => {
          if (!r) {
            this.store.dispatch(new UIActions.IsLoading(true));
            this.store.dispatch(new MainAction.DoFetchStatistic(this.queryParams));
            this.statisticTableHeads = [];
            this.allFilters = [];
            this.selectedAllFilters = [];
            return;
          }
          // console.log('statistic State => ', r);

          if (!this.isPageLoaded) {
            this.createStatisticTableHeads(r.statistic[0]);
            this.createPTData(r.pixelTracking);
            this.allFilters = r.filters;
            this.fillAllFiltersForm();
            this.watchOnFiltersFormChanges();
            this.selectedAllFilters = this.fillSelectedAllFilters(this.allFiltersForm.value);
            this.isPageLoaded = true;
          }
        }
      )
    );

    this.statisticState$ = this.store.select(fromMain.getStatistic);

    this.subs.push(this.store.select(fromRoot.getUserStatisticFilters)
      .subscribe((response: StatisticPanelFilterList) => {
        this.userStatisticPanelFilters = response;
        // console.log('userStatisticPanelFilters => ', this.userStatisticPanelFilters);
      })
    );
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  initQueryParams(): QueryParams {
    const currDate = new Date();
    return {
      fromDate: new Date(currDate.setDate(currDate.getDate() - 7)),
      toDate: new Date(),
      siteId: 1
      // {
      //   id: 1,
      //   name: 'All sites'
      // }
    };
  }

  initForms() {
    this.initSaveFiltersListForm();
    this.initAllFiltersForm();
  }

  initAllFiltersForm() {
    this.allFiltersForm = new FormGroup({
    });
  }

  // Dynamically create Filter-Group, Filter-Items based on backed data
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

  // make statistic-table request when filter changes
  watchOnFiltersFormChanges() {
    this.allFiltersForm.valueChanges.subscribe(
      formState => {
        this.selectedAllFilters = this.fillSelectedAllFilters(formState);
        // console.log('selectedAllFilters => ', this.selectedAllFilters);
        const params = {...this.queryParams};
        params.filters = this.selectedAllFilters;
        this.helper.preventBodyToScroll(true);
        this.store.dispatch(new UIActions.IsLoading(true));
        this.store.dispatch(new MainAction.DoFetchStatisticTable(params));
      });
  }

  initSaveFiltersListForm() {
    this.saveFiltersListForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  // store user-created filters-list
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
        const obj = { name: menuProp, filterList: [] };
        for (const el in formState[menuProp]) {
          if (formState[menuProp][el]) {
            obj.filterList.push({ name: el, enabled: true });
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

  onChangeStatisticFiltersVisibility() {
    this.isStatisticFiltersVisible = !this.isStatisticFiltersVisible;
  }

  onChangeStatisticQueryParams(queryParams) {
    this.queryParams.fromDate = queryParams.fromDate;
    this.queryParams.toDate = queryParams.toDate;
    this.queryParams.siteId = queryParams.dropdownItem.id;
    // console.log(this.queryParams);
    this.store.dispatch(new UIActions.IsLoading(true));
    this.store.dispatch(new MainAction.DoFetchStatistic(this.queryParams));
  }

  // ---- statistic table start -----
  createStatisticTableHeads(el: Statistic) {
    this.statisticTableHeads = Object.keys(el).slice(1, -1);
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
  // ---- statistic table end -----


  // ----- cards section start --------
  calcCardsGraphElHeight(arr: any): number {
    if (!arr || !arr.length) {
      return 1;
    }
    return arr.reduce((sum, curr) => sum + curr.amount, 0);
  }
  // ----- cards section end --------


  // ----- cards section end --------
  createPTData(arr: PixelTracking[]) {
    this.createPTTableHeads(arr[0]);
    this.putPTEventsListToStore();
    this.calcPTPropCount(arr);
  }
  calcPTPropCount(arr) {
    this.ptData.ptTableHeads.slice(1).forEach(el => this.ptData.ptPropCount[el] = 0);
    arr.forEach(el => {
      Object.keys(this.ptData.ptPropCount).forEach(prop => this.ptData.ptPropCount[prop] += el[prop]);
    });
    // console.log(this.ptData.ptPropCount);
  }

  createPTTableHeads(el: PixelTracking) {
    this.ptData.ptTableHeads = Object.keys({ ...el });
  }

  getPTTableHeads() {
    return this.ptData.ptTableHeads.slice();
  }

  putPTEventsListToStore() {
    this.store.dispatch(new MainAction.FillPTEventsNamesList(this.ptData.ptTableHeads.slice(1)));
  }
  // ----- cards section end --------



  ngOnDestroy() {
    this.store.dispatch(new MainAction.SaveStatisticFilters(this.selectedAllFilters));
    this.subs.forEach(s => s.unsubscribe());
  }
}
