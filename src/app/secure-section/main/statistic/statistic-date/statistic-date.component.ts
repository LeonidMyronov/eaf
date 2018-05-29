import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as MainActions from '../../../store/main.actions';
import * as fromMain from '../../../store/main.reducer';
import { StatisticByDate } from '../../../store/main.model';

@Component({
  selector: 'eaf-statistic-date',
  templateUrl: './statistic-date.component.html',
  styleUrls: ['./statistic-date.component.sass']
})
export class StatisticDateComponent implements OnInit {
  dateInput: Date;
  panelTitle = 'Orders';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      console.log(response);
      this.dateInput = new Date(response.date.replace(/-/g, ','));
      this.store.dispatch(new MainActions.BeforeFetchDayStat({date: this.dateInput}));
    });

    this.store.select(fromMain.getStatisticByDate)
      .subscribe((response: {date: Date, data: StatisticByDate[]}) => console.log(response));
  }

  onChangeDate(e: {date: Date}) {
    const routeSuffix = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`;
    this.router.navigate(['../', routeSuffix], {relativeTo: this.route});
  }

}
