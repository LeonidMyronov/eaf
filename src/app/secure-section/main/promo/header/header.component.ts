import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PromoStorageService } from '../services/promo-storage.service';
import { MainService } from '../../../services/main.service';
import { HelperService } from '../../../../core/helper.service';

// import * as fromRoot from '../../../../app.reducers';
import * as fromMain from '../../../store/main.reducer';
import { User } from '../../../user/user.model';
import { NavItem } from '../promo.model';
import { Site } from '../../../../core/core.model';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  siteState$: Observable<{refLink: string, site: Site}>;
  navMenu: NavItem[];
  constructor(
    // private store: Store<fromRoot.State>,
    private store: Store<fromMain.State>,
    private promoStorage: PromoStorageService,
    private mainService: MainService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.navMenu = this.promoStorage._navMenu;
    this.siteState$ = this.store.select(fromMain.getPromoSiteData);
  }

  onLinkCopy(link: string) {
    this.mainService.copyToClipboard(link)
      .then(resolve => this.helper.onSuccessClipboardCopy())
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }
}
