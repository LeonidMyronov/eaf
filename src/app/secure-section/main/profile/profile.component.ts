import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { MainStorageService } from '../../services/main-storage.service';

import * as fromRoot from '../../../app.reducers';
import { User } from '../../user/user.model';
import { PaymentMethod } from '../../store/main.model';

@Component({
  selector: 'eaf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userState: User;
  subs: Subscription;
  subscriptionForm: FormGroup;
  personalDataForm: FormGroup;
  paymentDataForm: FormGroup;
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethod[];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService,

  ) { }

  ngOnInit() {
    this.paymentMethods = this.mainStorage.getPaymentMethods();

    this.store.select(fromRoot.getUserState)
      .subscribe((response: {user: User}) => {
        this.userState = response.user;
        this.subscriptionFormInit();
        this.personalDataFormInit();
        this.paymentDataFormInit();
      });

    // this.paymentDataForm.valueChanges.subscribe(v => console.log(this.paymentDataForm));
  }

  // subscriptionForm --->
  subscriptionFormInit() {
    this.subscriptionForm = this.fb.group({
      email: this.fb.control({value: this.userState.email, disabled: true}),
      editMode: false
    });
  }

  onSubscriptionFormEdit() {
    this.subscriptionForm.get('email').enable();
    this.subscriptionForm.patchValue({editMode: true});
  }

  onSubscriptionFormCancel() {
    this.subscriptionForm.get('email').disable();
    this.subscriptionForm.patchValue({editMode: false});
  }

  onSubscriptionFormSubmit() {}
  // <--- subscriptionForm


  // personalDataForm --->
  personalDataFormInit() {
    this.personalDataForm = this.fb.group({
      editMode: false,
      name: this.fb.control({value: this.userState.name, disabled: true}),
      surname: this.fb.control({value: this.userState.surname, disabled: true}),
      skype: this.fb.control({value: this.userState.skypeAccount, disabled: true}),
      icq: this.fb.control({value: this.userState.icqAccount, disabled: true}),
      jabber: this.fb.control({value: this.userState.jabberAccount, disabled: true}),
      info: this.fb.control({value: this.userState.info, disabled: true}),
    });
  }

  onPersonalDataFormEdit() {
    this.personalDataForm.get('name').enable();
    this.personalDataForm.get('surname').enable();
    this.personalDataForm.get('skype').enable();
    this.personalDataForm.get('icq').enable();
    this.personalDataForm.get('jabber').enable();
    this.personalDataForm.get('info').enable();
    this.personalDataForm.patchValue({editMode: true});
  }

  onPersonalDataFormCancel() {
    this.personalDataForm.get('name').disable();
    this.personalDataForm.get('surname').disable();
    this.personalDataForm.get('skype').disable();
    this.personalDataForm.get('icq').disable();
    this.personalDataForm.get('jabber').disable();
    this.personalDataForm.get('info').disable();
    this.personalDataForm.patchValue({editMode: false});
  }

  onPersonalDataFormSubmit() {}
  // <---  personalDataForm


  // personalDataForm --->
  paymentDataFormInit() {
    if (this.userState.prefferedPaymentMethod) {
      this.paymentMethod = this.paymentMethods.find( el => el.id === this.userState.prefferedPaymentMethod);
    }
    this.paymentDataForm = this.fb.group({
      editMode: false,
      method: this.fb.control({value: this.paymentMethod || '', disabled: true}),
      notes: this.fb.control({value: this.userState.paymentNotes, disabled: true}),
    });
  }

  onPaymentDataFormEdit() {
    this.paymentDataForm.get('method').enable();
    this.paymentDataForm.get('notes').enable();
    this.paymentDataForm.patchValue({editMode: true});
  }

  onPaymentDataFormCancel() {
    this.paymentDataForm.get('method').disable();
    this.paymentDataForm.get('notes').disable();
    this.paymentDataForm.patchValue({editMode: false});
  }

  onChangePaymentMethod(item: PaymentMethod) {
    this.paymentDataForm.patchValue({method: item});
  }

  onPaymentDataFormSubmit() {}
  // <---  paymentDataForm

  onRefLinkCopy(el) {
    el.select();
    document.execCommand('copy');
    el.setSelectionRange(0, 0);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
