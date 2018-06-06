import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStorageService } from '../core/app-storage.service';
import { HelperService } from '../core/helper.service';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';
import { Observable } from 'rxjs/Observable';
import { Site } from '../core/core.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public deployPath = environment.deployPath;
  public isAuth = false;
  public isMobileMenuOpened$: Observable<boolean>;
  public userState$: Observable<any>;

  public navMenu: any[] = [];
  public authMenu: any[] = [];
  public tariffsList: Site[] = [];
  public userTariff: Site;
  public langsList: any[] = [];
  public userLang;
  public userMenu: any[];

  private authSubs: Subscription;
  private siteSubs: Subscription;


  constructor(
    private appStorage: AppStorageService,
    private router: Router,
    private helper: HelperService,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubs = this.store.select(fromRoot.getIsAuth)
      .subscribe(
        isAuth => {
          this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth);
          this.userMenu = this.appStorage.getUserMenu();
          this.isAuth = isAuth;
        }
      );

    this.siteSubs = this.store.select(fromRoot.getOurSites)
      .subscribe(
        (response: Site[]) => {
          this.tariffsList = response;
          this.userTariff = this.tariffsList[0];
        }
      );

    this.userState$ = this.store.select(fromRoot.getShortUserState);
    this.isMobileMenuOpened$ = this.store.select(fromRoot.getIsMobileMenuOpened);

    this.navMenu = this.appStorage.getNavMenu();
    this.langsList = this.appStorage.getLangsList();
    this.store.select(fromRoot.getCurrentLanguage)
    .subscribe( lang => this.userLang = lang);
  }

  onChangeLang(lang: any) {
    console.log(`change lang to ${lang.abbr}`);
    this.store.dispatch(new UIAction.SetLang(lang.abbr));
    // this.userLang = lang.abbr;
  }

  onChangeTariff(tariff: any) {
    console.log(`change tariff to ${tariff.name}`);
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
      case 'profile':
        this.router.navigate(['/main', 'profile']);
        break;
      case 'logout':
        this.authService.logout();
        break;
      default:
        console.log(name);
    }
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
    this.siteSubs.unsubscribe();
  }
}
