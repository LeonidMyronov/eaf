import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as MainActions from '../../../store/main.actions';
import * as UIActions from '../../../../ui/ui.actions';
import * as fromMain from '../../../store/main.reducer';
import { PixelTrackingEvent } from '../../../store/main.model';

@Component({
  selector: 'eaf-pt-date',
  templateUrl: './pt-date.component.html',
  styleUrls: ['./pt-date.component.sass']
})
export class PtDateComponent implements OnInit, OnDestroy {
  dateInput: Date;
  currentPTEvent: string;
  panelTitle = 'Pixel Tracking';
  ptEvents: PixelTrackingEvent[] = [];
  ptEventsNamesState: Observable<string[]>;
  ptTableHeads: string[] = [];

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
      this.createQuery();
    });

    this.store.select(fromMain.getPTEventsDetails)
    .subscribe(r => {
      if (r) {
        this.ptEvents = r;
        this.createPTTableHeads(this.ptEvents[0]);
      }
    });

    this.ptEventsNamesState = this.store.select(fromMain.getPTEventsNames);

  }

  createQuery() {
    this.store.dispatch(new UIActions.IsLoading(true));
    this.store.dispatch(new MainActions.BeforeFetchPTEventsDetails({date: this.dateInput, eventName: this.currentPTEvent}));
  }

  onChangePanelQuery(e: {date: Date, dropdown: string}) {
    this.createQuery();
    const routeSuffix = `${e.date.getFullYear()}-${e.date.getMonth() + 1}-${e.date.getDate()}`;
    this.router.navigate(['../', routeSuffix], {relativeTo: this.route, queryParams: {event: e.dropdown}});
  }

  createPTTableHeads(el: PixelTrackingEvent) {
    if (!el) {
      return [];
    }
    this.ptTableHeads = Object.keys(el).slice();
  }

  getPTTableHeads() {
    return this.ptTableHeads.slice();
  }

  ngOnDestroy() {
    // this.subs.unsubscribe();
    console.log('destroy eaf-pt-date');
  }

}
