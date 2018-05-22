import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MainService } from '../../services/main.service';

import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { Discounts } from '../../store/main.model';

@Component({
  selector: 'eaf-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.sass']
})
export class DiscountComponent implements OnInit, OnDestroy {
  discountForm: FormGroup;
  discountsData: Discounts;
  private subs: Subscription;

  constructor(
    private store: Store<fromMain.MainState>,
    private mainService: MainService
  ) { }
  ngOnInit() {
    this.subs = this.store.select(fromMain.getDiscounts)
      .subscribe((response: Discounts) => {
        if (!response.visitorsLastMonth) {
          this.mainService.fetchDiscountIntro();
        } else {
          this.discountsData = response;
        }
      });
    this.initForm();
  }

  initForm() {
    this.discountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      proto: new FormControl('http'),
      amount: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.discountForm.value);
    this.store.dispatch(new MainActions.SubmitDiscountRequest());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
