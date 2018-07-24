import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MainStorageService } from '../../../services/main-storage.service';

import { Site } from '../../../../core/core.model';
import { PTEventData, PTEventParamsData } from '../../../store/main.model';
import * as fromRoot from '../../../../app.reducers';
import * as UserActions from '../../../user/store/user.actions';

@Component({
  selector: 'eaf-pt-form',
  templateUrl: './pt-form.component.html',
  styleUrls: ['./pt-form.component.sass']
})
export class PtFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: number; // site ID
  @Output() close = new EventEmitter<boolean>();
  ptEventsForm: FormGroup;
  ptEventsList = [];
  postBackParams = [];
  selectedPTEvent: {id: number, name: string, status: number};
  siteState: Site;
  subs: Subscription;
  pbSnippet: string;

  constructor(
    private mainStorage: MainStorageService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.initForm();
    this.ptEventsList = this.mainStorage.getPTEvents();
    this.postBackParams = this.mainStorage.getPostBackParams();
    this.pbSnippet = 'http://demo.com/callback/?tracking={tracking}&site={site}&event={event}&rid={rid}&sid={sid}&click_id={click_id}&user_id={user_id}&user_geo={user_geo}';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const v = changes.id.currentValue;
    if (!v || !Number.isInteger(v) ) {
      return;
    }
    this.subs = this.store.select(fromRoot.getOurSites)
      .map(sites => sites.find(s => s.id === this.id))
      .subscribe(r => this.siteState = r);
  }

  initForm() {
    this.ptEventsForm = new FormGroup({});
  }

  onClickPTEvent(event) {
    this.selectedPTEvent = event;
  }

  onCloseForm() {
    this.close.emit(true);
  }

  isPTEventExist(id: number) {
    if (!this.siteState || !this.siteState.ptEventParamsData) {return false; }
    return this.siteState.ptEventParamsData.find(item => item.id === id);
  }

  getPTEventStatus(id: number) {
     const event = this.isPTEventExist(id);
     if (event) {
       return event.status;
     }
     return false;
  }
  getPTEventParamsData() {
    return this.siteState.ptEventParamsData;
  }

  onChangePTEventStatus(id: number, event) {
    const ptEvent = <PTEventParamsData>(this.isPTEventExist(id));
    const params = {
      id: ptEvent.id, // pixel-tracking event ID
      status: +(!ptEvent.status) // pixel-tracking event Status
    };
    this.store.dispatch(new UserActions.DoChangePixelTrackingEventStatus({id: this.id, event: params}));
    event.stopPropagation();
  }

   onAddEvent(value: PTEventData) {
    const mapToPTEventParamsData = {
      ...value,
      ...this.selectedPTEvent,
      status: 1 // this value should be fetched from BE. Remove after implementation
    };
    this.store.dispatch(new UserActions.DoSendPixelTrackingEventParams(
      {
        id: this.id,
        ptEventParamsData: mapToPTEventParamsData
      })
    );
    this.selectedPTEvent = null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
