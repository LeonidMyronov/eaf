import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MainStorageService } from '../../services/main-storage.service';
import { MainService } from '../../services/main.service';
import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as MainActions from '../../store/main.actions';
import * as UIActions from '../../../ui/ui.actions';
import { Site } from '../../../core/core.model';
import { RefPage } from '../../store/main.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'eaf-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.sass']
})
export class OfferComponent implements OnInit {
  public siteState$: Observable<Site[]>;
  public userId$: Observable<number>;
  public refPages: RefPage[];
  public selectedRefPages = new Map();
  constructor(
    private store: Store<fromRoot.State>,
    private mainStorage: MainStorageService,
    private mainService: MainService,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.refPages = this.mainStorage.getRefPages();
    this.siteState$ = this.store.select(fromRoot.getOurSites)
      .map((sites: Site[]) => {
        sites.forEach(site => this.selectedRefPages.set(site.name, this.refPages[0]));
        return sites;
      });
    this.userId$ = this.store.select(fromRoot.getShortUserState).map((response: Partial<User>) => response.id);
  }

  onChangeRefPage(item: RefPage, siteName: string) {
    this.selectedRefPages.set(siteName, item);
  }

  getUrlEnc(str: string): string {
    return encodeURIComponent(str);
  }

  getRefLink(siteName: string, id: number, params?: string): string {
    return this.mainService.getRefLink(siteName, id, params);
  }

  onCopyToClipboard(link: string) {
    this.mainService.copyToClipboard(link)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

  onNavigateToPromoModule(refLink: string, site: Site, page: string): void {
    this.store.dispatch(new UIActions.IsLoading(true));
    this.helper.preventBodyToScroll(true);
    this.store.dispatch(new MainActions.SetPromoSiteData({refLink, site}));
    this.router.navigate(['/main', 'promo', page]);
  }
}
