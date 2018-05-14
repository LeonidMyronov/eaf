import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MainStorageService } from '../../services/main-storage.service';

import * as fromRoot from '../../../app.reducers';
import { PaymentMethod } from '../../store/main.model';

@Component({
  selector: 'eaf-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  userBalanceState$: Observable<any>;
  balanceForm: FormGroup;
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethod[];

  constructor(
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService,
  ) { }

  ngOnInit() {
    this.paymentMethods = this.mainStorage.getPaymentMethods();
    this.initForm();
    this.onChangePaymentMethod(this.paymentMethods[0]);
    this.userBalanceState$ = this.store.select(fromRoot.getUserBalanceState);
  }

  initForm() {
    this.balanceForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      details: new FormControl(''),
      payment: new FormControl(null),
      regular: new FormControl()
    });
  }

  onChangePaymentMethod(payment: PaymentMethod) {
    this.paymentMethod = payment;
    this.balanceForm.patchValue({payment: payment});
  }

  onSubmit() {
    console.log(this.balanceForm.value);
  }
}
