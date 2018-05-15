import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MainStorageService } from '../../services/main-storage.service';

import * as fromRoot from '../../../app.reducers';
import { PaymentMethod } from '../../store/main.model';

export interface TransactionQueryParams {
  fromDate: Date;
  toDate: Date;
  paymentMethod: {};
}

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
  transactionQueryParams: TransactionQueryParams;

  constructor(
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService,
  ) { }

  ngOnInit() {
    this.paymentMethods = this.mainStorage.getPaymentMethods();
    this.initForm();
    this.transactionQueryParams = this.initTransactionQueryParams();
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

  initTransactionQueryParams(): TransactionQueryParams {
    const currDate = new Date();
    return {
      fromDate: new Date(currDate.setDate(currDate.getDate() - 7)),
      toDate: new Date(),
      paymentMethod: {
        id: 1,
        name: 'Pay Pal'
      }
    };
  }

  onChangePaymentMethod(payment: PaymentMethod) {
    this.paymentMethod = payment;
    this.balanceForm.patchValue({payment: payment});
  }

  onSubmitBalanceForm() {
    console.log(this.balanceForm.value);
  }

  onChangeTrnsactionQueryParams(queryParams) {
    this.transactionQueryParams.fromDate = queryParams.fromDate;
    this.transactionQueryParams.toDate = queryParams.toDate;
    this.transactionQueryParams.paymentMethod = queryParams.dropdownItem;
    // console.log(queryParams, this.transactionQueryParams);
  }
}
