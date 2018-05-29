import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as MainActions from '../../../store/main.actions';
import * as fromMain from '../../../store/main.reducer';

@Component({
  selector: 'eaf-pt-date',
  templateUrl: './pt-date.component.html',
  styleUrls: ['./pt-date.component.sass']
})
export class PtDateComponent implements OnInit {
  dateInput: Date;
  currentPTEvent: string;
  panelTitle = 'Pixel Tracking';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromMain.MainState>,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.dateInput = new Date(response.date.replace(/-/g, ','));
    });
    this.route.queryParams.subscribe(response => {
      this.currentPTEvent = response.event;
      this.store.dispatch(new MainActions.BeforeFetchPTEventsDetails({date: this.dateInput, eventName: this.currentPTEvent}));
    });
  }

  onChangePanelQuery(e: {date: Date, eventName: string}) {
    const routeSuffix = `${e.date.getFullYear()}-${e.date.getMonth() + 1}-${e.date.getDate()}`;
    this.router.navigate(['../', routeSuffix], {relativeTo: this.route});
  }

}
