import { Component, OnInit, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MainService } from '../../services/main.service';
import { MainStorageService } from '../../services/main-storage.service';
import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as UIActions from '../../../ui/ui.actions';
import * as UserActions from '../../user/store/user.actions';
import { PaymentMethod, Transaction } from '../../store/main.model';

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
export class BalanceComponent implements OnInit, AfterContentChecked {
  @ViewChild('trtb') trtb: ElementRef;
  @ViewChild('trtl') trtl: ElementRef;
  userBalanceState$: Observable<any>;
  transactionsState: Transaction[];
  balanceForm: FormGroup;
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethod[];
  transactionQueryParams: TransactionQueryParams;
  transactionsTableHeads: string[];

  constructor(
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService,
    private mainService: MainService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.paymentMethods = this.mainStorage.getPaymentMethods();
    this.initForm();
    this.transactionQueryParams = this.initTransactionQueryParams();
    this.onChangePaymentMethod(this.paymentMethods[0]);
    this.userBalanceState$ = this.store.select(fromRoot.getUserBalanceState);
    this.store.select(fromMain.getTransactions).subscribe((r: Transaction[]) => {
      if (!r.length) {
        this.mainService.fetchTransactionsByPeriod(this.transactionQueryParams);
      } else {
        this.createTrTableHeads(r[0]);
        this.transactionsState = r;
      }
    });
  }

  ngAfterContentChecked() {
  }

  initForm() {
    this.balanceForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      details: new FormControl(''),
      payment: new FormControl(null),
      regular: new FormControl(false)
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
    const requestData = {
      amount: this.balanceForm.value.amount,
      details: this.balanceForm.value.details,
      paymentId: this.balanceForm.value.payment.id,
      regular: this.balanceForm.value.regular
    };
    console.log(requestData);
    this.store.dispatch(new UIActions.IsLoading(true));
    this.helper.preventBodyToScroll(true);
    this.store.dispatch(new UserActions.DoSendWithdrawRequest(requestData));
  }

  onChangeTrnsactionQueryParams(queryParams) {
    this.transactionQueryParams.fromDate = queryParams.fromDate;
    this.transactionQueryParams.toDate = queryParams.toDate;
    this.transactionQueryParams.paymentMethod = queryParams.dropdownItem;
    // console.log(queryParams, this.transactionQueryParams);
  }

  createTrTableHeads(el: Transaction) {
    this.transactionsTableHeads = Object.keys(el).slice();
  }
  getTrTableHeads() {
    return [...this.transactionsTableHeads];
  }
}
