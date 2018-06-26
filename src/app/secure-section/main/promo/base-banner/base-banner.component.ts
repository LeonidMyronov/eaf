import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../../../services/main.service';
import { HelperService } from '../../../../core/helper.service';

import * as fromMain from '../../../store/main.reducer';
import { Banner } from '../promo.model';
import { Coupon } from '../../../store/main.model';

export abstract class BaseBannerComponent {
  public promoState$: Observable<{siteName: string, refLink: string, banners: Banner[], coupons: Coupon[]}>;

  constructor(
    protected store: Store<fromMain.State>,
    protected mainService: MainService,
    protected helper: HelperService
  ) {}

  abstract onSelectCoupon(id: number, coupon: Coupon): void;

  abstract onAddUtm(id: number, utm: string): void;

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
      .then(resolve => this.helper.onSuccessClipboardCopy())
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

}
