import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { MainStorageService } from '../../services/main-storage.service';
import { MainService } from '../../services/main.service';

import * as fromRoot from '../../../app.reducers';
import * as UserActions from '../../user/store/user.actions';
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
    private mainService: MainService

  ) { }

  ngOnInit() {
    this.paymentMethods = this.mainStorage.getPaymentMethods();

    this.subs = this.store.select(fromRoot.getUserState)
      .take(1)
      .subscribe((response: {user: User}) => {
        this.userState = response.user;
        this.subscriptionFormInit();
        this.personalDataFormInit();
        this.paymentDataFormInit();
      });
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

  onSubscriptionFormSubmit() {
    const updatedData = {...this.subscriptionForm.value};
    delete updatedData.editMode;
    this.store.dispatch(new UserActions.BeforeUpdateProfile(updatedData));
    this.onSubscriptionFormCancel();
  }
  // <--- subscriptionForm


  // personalDataForm --->
  personalDataFormInit() {
    this.personalDataForm = this.fb.group({
      editMode: false,
      name: this.fb.control({value: this.userState.name, disabled: true}),
      surname: this.fb.control({value: this.userState.surname, disabled: true}),
      skypeAccount: this.fb.control({value: this.userState.skypeAccount, disabled: true}),
      icqAccount: this.fb.control({value: this.userState.icqAccount, disabled: true}),
      jabberAccount: this.fb.control({value: this.userState.jabberAccount, disabled: true}),
      info: this.fb.control({value: this.userState.info, disabled: true}),
    });
  }

  onPersonalDataFormEdit() {
    this.personalDataForm.get('name').enable();
    this.personalDataForm.get('surname').enable();
    this.personalDataForm.get('skypeAccount').enable();
    this.personalDataForm.get('icqAccount').enable();
    this.personalDataForm.get('jabberAccount').enable();
    this.personalDataForm.get('info').enable();
    this.personalDataForm.patchValue({editMode: true});
  }

  onPersonalDataFormCancel() {
    this.personalDataForm.get('name').disable();
    this.personalDataForm.get('surname').disable();
    this.personalDataForm.get('skypeAccount').disable();
    this.personalDataForm.get('icqAccount').disable();
    this.personalDataForm.get('jabberAccount').disable();
    this.personalDataForm.get('info').disable();
    this.personalDataForm.patchValue({editMode: false});
  }

  onPersonalDataFormSubmit() {
    const updatedData = {...this.personalDataForm.value};
    delete updatedData.editMode;
    this.store.dispatch(new UserActions.BeforeUpdateProfile(updatedData));
    this.onPersonalDataFormCancel();
  }
  // <---  personalDataForm


  // personalDataForm --->
  paymentDataFormInit() {
    if (this.userState.prefferedPaymentMethod) {
      this.paymentMethod = this.paymentMethods.find( el => el.id === this.userState.prefferedPaymentMethod);
    }
    this.paymentDataForm = this.fb.group({
      editMode: false,
      prefferedPaymentMethod: this.fb.control({value: this.paymentMethod || '', disabled: true}),
      paymentNotes: this.fb.control({value: this.userState.paymentNotes, disabled: true}),
    });
  }

  onPaymentDataFormEdit() {
    this.paymentDataForm.get('prefferedPaymentMethod').enable();
    this.paymentDataForm.get('paymentNotes').enable();
    this.paymentDataForm.patchValue({editMode: true});
  }

  onPaymentDataFormCancel() {
    this.paymentDataForm.get('prefferedPaymentMethod').disable();
    this.paymentDataForm.get('paymentNotes').disable();
    this.paymentDataForm.patchValue({editMode: false});
  }

  onChangePaymentMethod(item: PaymentMethod) {
    this.paymentDataForm.patchValue({prefferedPaymentMethod: item});
    this.paymentDataForm.markAsDirty();
  }

  onPaymentDataFormSubmit() {
    const updatedData = {
      prefferedPaymentMethod: this.paymentDataForm.get('prefferedPaymentMethod').value.id,
      paymentNotes: this.paymentDataForm.get('paymentNotes').value
    };
    this.store.dispatch(new UserActions.BeforeUpdateProfile(updatedData));
    this.onPaymentDataFormCancel();
  }
  // <---  paymentDataForm

  onRefLinkCopy(link: string) {
    this.mainService.copyToClipboard(link)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
