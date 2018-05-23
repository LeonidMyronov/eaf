import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MainService } from '../../services/main.service';

import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { Discounts } from '../../store/main.model';

@Component({
  selector: 'eaf-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.sass']
})
export class DiscountDetailsComponent implements OnInit, OnDestroy {
  discountGeneratorForm: FormGroup;
  discountsData: Discounts;
  private subs: Subscription;

  constructor(
    private store: Store<fromMain.MainState>,
    private mainService: MainService
  ) { }
  ngOnInit() {
    this.subs = this.store.select(fromMain.getDiscounts)
      .subscribe((response: Discounts) => {
        if (!response.availableCoupons) {
          this.mainService.fetchDiscountDetails();
        } else {
          this.discountsData = response;
        }
      });
    this.initForm();
  }

  initForm() {
    this.discountGeneratorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      proto: new FormControl('http'),
      amount: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.discountGeneratorForm.value);
    // this.store.dispatch(new MainActions.SubmitDiscountRequest());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
