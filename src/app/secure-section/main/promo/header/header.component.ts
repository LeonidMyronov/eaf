import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PromoStorageService } from '../services/promo-storage.service';
import { MainService } from '../../../services/main.service';

import * as fromRoot from '../../../../app.reducers';
import { User } from '../../../user/user.model';
import { NavItem } from '../promo.model';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userState$: Observable<Partial<User>>;
  navMenu: NavItem[];
  constructor(
    private store: Store<fromRoot.State>,
    private promoStorage: PromoStorageService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.navMenu = this.promoStorage._navMenu;
    this.userState$ = this.store.select(fromRoot.getShortUserState);
  }

  onLinkCopy(link: string) {
    this.mainService.copyToClipboard(link)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }
}
