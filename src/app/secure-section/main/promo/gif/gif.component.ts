import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MainService } from '../../../services/main.service';
import { HelperService } from '../../../../core/helper.service';

import { BaseBannerComponent } from '../base-banner/base-banner.component';

import * as fromMain from '../../../store/main.reducer';
import * as MainActions from '../../../store/main.actions';
import { Coupon } from '../../../store/main.model';

@Component({
  selector: 'eaf-gif',
  templateUrl: '../base-banner/base-banner.component.html',
  styleUrls: ['../base-banner/base-banner.component.sass']
})
export class GifComponent extends BaseBannerComponent implements OnInit {

  constructor(
    protected store: Store<fromMain.State>,
    protected mainService: MainService,
    protected helper: HelperService

  ) {
    super(store, mainService, helper);
   }

  ngOnInit() {
    this.promoState$ = this.store.select(fromMain.getPromoAnimated);
  }

  onSelectCoupon(id: number, coupon: Coupon): void {
    this.store.dispatch(new MainActions.UpdatePromoABannerCoupon({id, coupon: coupon.name}));
  }

  onAddUtm(id: number, utm: string) {
    this.store.dispatch(new MainActions.UpdatePromoABannerUTM({id, utm}));

  }

}
