import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStorageService } from '../core/app-storage.service';
import { HelperService } from '../core/helper.service';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public deployPath = environment.deployPath;
  public isAuth = false;
  public isMobileMenuOpened$: Observable<boolean>;
  public userState$: Observable<any>;

  public navMenu: any[] = [];
  public authMenu: any[] = [];
  public tariffsList: any[] = [];
  public userTariff: any;
  public langsList: any[] = [];
  public userLang = 'us';
  public userMenu: any[];


  constructor(
    private appStorage: AppStorageService,
    private router: Router,
    private helper: HelperService,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.store.select(fromRoot.getIsAuth)
      .subscribe(
        isAuth => {
          this.tariffsList = this.appStorage.getTariffsList();
          console.log(this.tariffsList);
          this.userTariff = this.tariffsList[0];
          this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth);
          this.userMenu = this.appStorage.getUserMenu();
          this.isAuth = isAuth;
        }
      );
    this.userState$ = this.store.select(fromRoot.getShortUserState);
    this.isMobileMenuOpened$ = this.store.select(fromRoot.getIsMobileMenuOpened);

    this.langsList = this.appStorage.getLangsList();
    this.navMenu = this.appStorage.getNavMenu();
  }

  onChangeLang(lang: any) {
    console.log(`change lang to ${lang.abbr}`);
    this.userLang = lang.abbr;
  }

  onChangeTariff(tariff: any) {
    console.log(`change tariff to ${tariff.siteName}`);
    this.userTariff = tariff;
  }

  onOpenMobileMenu() {
    this.store.dispatch(new UIAction.IsMobileMenuOpened(true));
    this.helper.preventBodyToScroll(true);
  }

  onAuthMenuClick(name: string) {
    // this.router.navigate([`${url}`]);
    switch (name) {
      case 'login':
        this.store.dispatch(new UIAction.IsLoginFormOpened(true));
        this.helper.preventBodyToScroll(true);
        break;
      case 'registration':
        this.store.dispatch(new UIAction.IsSignupFormOpened(true));
        this.helper.preventBodyToScroll(true);
        break;
        case 'logout':
        this.authService.logout();
        break;
      default:
        console.log(name);
    }
  }
}
