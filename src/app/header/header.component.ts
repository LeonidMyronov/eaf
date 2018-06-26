import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../core/app-storage.service';
import { HelperService } from '../core/helper.service';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';
import * as AuthActions from '../auth/store/auth.actions';
import { Site, AuthMenuItem, NavMenuItem, UserMenuItem, LangListItem } from '../core/core.model';

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

  public navMenu: NavMenuItem[] = [];
  public authMenu: AuthMenuItem[] = [];
  public tariffsList: Site[] = [];
  public userTariff: Site;
  public langsList: LangListItem[] = [];
  public userLang: string;
  public userMenu: UserMenuItem[];

  private subs: Subscription[] = [];

  constructor(
    private appStorage: AppStorageService,
    private router: Router,
    private helper: HelperService,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(fromRoot.getIsAuth)
        .subscribe(
          isAuth => {
            this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth);
            this.userMenu = this.appStorage.getUserMenu();
            this.isAuth = isAuth;
          }
        )
    );

    this.subs.push(
      this.store.select(fromRoot.getOurSites)
        .subscribe(
          (response: Site[]) => {
            this.tariffsList = response;
            this.userTariff = this.tariffsList[0];
          })
      );

    this.userState$ = this.store.select(fromRoot.getShortUserState);
    this.isMobileMenuOpened$ = this.store.select(fromRoot.getIsMobileMenuOpened);

    this.navMenu = this.appStorage.getNavMenu();
    this.langsList = this.appStorage.getLangsList();
    this.subs.push(
      this.store.select(fromRoot.getCurrentLanguage)
        .subscribe( lang => this.userLang = lang)
    );
  }

  onChangeLang(lang: any) {
    console.log(`change lang to ${lang.abbr}`);
    this.store.dispatch(new UIAction.SetLang(lang.abbr));
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
        this.helper.preventBodyToScroll(true);
        this.store.dispatch(new UIAction.IsLoading(true));
        this.store.dispatch(new AuthActions.DoLogout());
        break;
      default:
        console.log(name);
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
