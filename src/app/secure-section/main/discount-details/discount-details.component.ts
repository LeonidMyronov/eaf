import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MainService } from '../../services/main.service';
import { MainStorageService, DiscountSite } from '../../services/main-storage.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { Discounts, Coupon } from '../../store/main.model';

@Component({
  selector: 'eaf-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.sass']
})
export class DiscountDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('actb') trtb: ElementRef;
  @ViewChild('actl') trtl: ElementRef;
  discountGeneratorForm: FormGroup;
  discountsData: Discounts;
  sitesArr: DiscountSite[];
  sliderPos = 0;
  maxSlidesPerPage: number;
  activeSlideIndex = 0;
  rangePoints = new Array(16);
  couponsStatTableHeads: string[];
  private subs: Subscription[] = [];

  constructor(
    private store: Store<fromMain.MainState>,
    private mainService: MainService,
    private mainStorage: MainStorageService,

  ) { }
  ngOnInit() {
    this.sitesArr = this.mainStorage.getSitesArr();
    this.subs.push(this.store.select(fromMain.getDiscounts)
      .subscribe((response: Discounts) => {
        if (!response.availableCoupons) {
          this.mainService.fetchDiscountDetails();
        } else {
          this.discountsData = response;
          this.couponsStatTableHeads = this.createTableHeads(this.discountsData.activeCoupons[0]);
        }
      }));

    this.subs.push(this.store.select(fromRoot.getActiveMediaQuery)
    .subscribe(
      (activeMedia: string) => this.maxSlidesPerPage = activeMedia === 'xs' ? 1 : 3
    ));

    this.initForm();
    this.discountGeneratorForm.get('discountRange').valueChanges.subscribe(v => {
      this.discountGeneratorForm.patchValue({'discountValue': v + '%'});
    });
  }

  initForm() {
    this.discountGeneratorForm = new FormGroup({
      site: new FormControl(this.sitesArr[this.activeSlideIndex]),
      code: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      term: new FormControl('1'),
      discountRange: new FormControl(5),
      discountValue: new FormControl('5%')
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
    if (this.sitesArr.length - (this.maxSlidesPerPage - this.sliderPos) === 0) {
      return;
    } else {
      this.sliderPos -= 1;
    }
  }

  onClickSlide(i) {
    this.activeSlideIndex = i;
    this.discountGeneratorForm.patchValue({site: this.sitesArr[i]});
  }

  // enter discount via input[type=text]
  onEnterDiscountValue(e) {
    let _discount;
      try {
        if (!e || !e.target || !e.target.value) {
          throw new Error(`isn't HTML Input Object`);
      }
      _discount = parseInt(e.target.value, 10);
      if (!Number.isInteger(_discount)) {
        throw new Error('not number');
      }
      if (_discount < 5 || _discount > 20) {
        throw new Error('exceed range');
      }
    } catch (e) {
      console.log(`DiscountRangeException! ${e}`);
      this.discountGeneratorForm.patchValue({'discountValue': this.discountGeneratorForm.get('discountRange').value + '%'});
      return;
    }
    this.discountGeneratorForm.patchValue({'discountRange': _discount});
  }

  onSubmit() {
    console.log(this.discountGeneratorForm.value);
    // this.store.dispatch(new MainActions.SubmitDiscountRequest());
  }

  createTableHeads(el: Coupon) {
    return Object.keys(el).slice();
  }
  getCouponsStatTableHeads() {
    return [...this.couponsStatTableHeads];
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}