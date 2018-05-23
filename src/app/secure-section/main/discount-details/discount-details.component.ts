import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MainService } from '../../services/main.service';
import { MainStorageService, DiscountSite } from '../../services/main-storage.service';

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
  sitesArr: DiscountSite[];
  sliderPos = 0;
  activeSlideIndex = 1;
  private subs: Subscription;

  constructor(
    private store: Store<fromMain.MainState>,
    private mainService: MainService,
    private mainStorage: MainStorageService,

  ) { }
  ngOnInit() {
    this.sitesArr = this.mainStorage.getSitesArr();
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
      site: new FormControl(this.sitesArr[this.activeSlideIndex]),
      amount: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  onSlideLeft() {
    if (this.sliderPos === 0) {
      return;
    } else {
      this.sliderPos += 1;
    }
  }

  onSlideRight() {
    if (this.sitesArr.length - (3 - this.sliderPos) === 0) {
      return;
    } else {
      this.sliderPos -= 1;
    }
  }

  onClickSlide(i) {
    this.activeSlideIndex = i;
    this.discountGeneratorForm.patchValue({site: this.sitesArr[i]});
  }

  onSubmit() {
    console.log(this.discountGeneratorForm.value);
    // this.store.dispatch(new MainActions.SubmitDiscountRequest());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
