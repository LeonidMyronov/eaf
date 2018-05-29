import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as MainActions from '../../../store/main.actions';
import * as fromMain from '../../../store/main.reducer';
import { StatisticByDate } from '../../../store/main.model';

@Component({
  selector: 'eaf-statistic-date',
  templateUrl: './statistic-date.component.html',
  styleUrls: ['./statistic-date.component.sass']
})
export class StatisticDateComponent implements OnInit, OnDestroy {
  dateInput: Date;
  panelTitle = 'Orders';
  statisticState: {date: Date, totalIncome: number, data: StatisticByDate[]};
  statisticTableHeads: string[];
  private filteredStatisticTableHeads = [];
  private subs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.dateInput = new Date(response.date.replace(/-/g, ','));
      this.store.dispatch(new MainActions.BeforeFetchDayStat({date: this.dateInput}));
    });

    this.subs = this.store.select(fromMain.getStatisticByDate)
      .subscribe((r: {date: Date, totalIncome: number, data: StatisticByDate[]}) => {
        this.createStatisticTableHeads(r.data[0]);
        this.statisticState = r;
      });
  }

  onChangeDate(e: {date: Date}) {
    const routeSuffix = `${e.date.getFullYear()}-${e.date.getMonth() + 1}-${e.date.getDate()}`;
    this.router.navigate(['../', routeSuffix], {relativeTo: this.route});
  }

  // ---- statistic table start -----
  createStatisticTableHeads(el: StatisticByDate) {
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
