import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import * as UIActions from '../../../ui/ui.actions';
import * as UserActions from '../../user/store/user.actions';
import { WhiteLabel } from '../../../core/core.model';

@Component({
  selector: 'eaf-whitelabel',
  templateUrl: './whitelabel.component.html',
  styleUrls: ['./whitelabel.component.sass']
})
export class WhitelabelComponent implements OnInit, OnDestroy {
  public wLForm: FormGroup;
  public ptEventsMode: boolean = false; // open PT-events form
  public selectedSiteId: number = null;
  public userWLState$: Observable<WhiteLabel[]>;

  private subs: Subscription;

  constructor(
    private helper: HelperService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.initForm();
    this.userWLState$ = this.store.select(fromRoot.getWLSites).map(s => s.filter(e => e.pixelTrackingEnabled));
  }

  initForm() {
    this.wLForm = new FormGroup({
      name: new FormControl('', Validators.required),
      proto: new FormControl('http'),
      details: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(new UIActions.IsLoading(true));
    this.helper.preventBodyToScroll(true);
    this.store.dispatch(new MainActions.DoSendWLRequest(this.wLForm.value));
    this.subs = this.store.select(fromRoot.getEraseFormState)
      .subscribe(response => this.wLForm.reset({name: '', proto: 'http', details: ''}));
  }

  onPTActivate(id: number, status: boolean) {
    this.store.dispatch(new UserActions.DoActivatePixelTracking({id, status}));
  }

  onChangePTEvents(id: number) {
    this.selectedSiteId = id;
    this.openPTEventsForm();
  }

  openPTEventsForm() {
    this.ptEventsMode = true;
  }

  closePTEventsForm($event) {
    this.ptEventsMode = false;
  }

  onSubmitPTEvents($event) {
    console.log('onSubmitPTEvents', $event);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
