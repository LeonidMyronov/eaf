import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../../../services/main.service';

import * as fromMain from '../../../store/main.reducer';
import * as MainActions from '../../../store/main.actions';
import { Banner } from '../promo.model';
import { Coupon } from '../../../store/main.model';

@Component({
  selector: 'eaf-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.sass']
})
export class StaticComponent implements OnInit {
  public staticPromoState$: Observable<{siteName: string, refLink: string, banners: Banner[], coupons: Coupon[]}>;
  constructor(
    private store: Store<fromMain.State>,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.staticPromoState$ = this.store.select(fromMain.getPromoStatic);
  }

  onSelectCoupon(id: number, coupon: Coupon): void {
    this.store.dispatch(new MainActions.UpdatePromoSBannerCoupon({id, coupon: coupon.name}));
  }

  onAddUtm(id: number, utm: string) {
    this.store.dispatch(new MainActions.UpdatePromoSBannerUTM({id, utm}));

  }

  generateSnippet(siteName: string, refLink: string, banner: Banner): string {
    let snippet = `<!--Start ${siteName} code-->
    `;
    let updatedRefLink = '<a href="' + refLink;
      if (banner.coupon) {
        updatedRefLink += '&coupon=' + banner.coupon;
      }
      if (banner.utm) {
        updatedRefLink += '&utm=' + encodeURIComponent(banner.utm);
      }
    snippet += updatedRefLink + '"> ';
    snippet += `
      <img src="${banner.bannerSrc}" alt="${banner.title}" title="${banner.title}"/>
      </a>
      <!--End ${siteName} code-->`;

    return snippet;
  }

  onCopyToClipboard(value) {
    this.mainService.copyToClipboard(value)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

}
