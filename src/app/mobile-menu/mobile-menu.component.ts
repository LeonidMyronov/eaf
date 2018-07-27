import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppStorageService } from '../core/app-storage.service';
import { AuthService } from '../auth/auth.service';
import { HelperService } from '../core/helper.service';

import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';
import * as AuthActions from '../auth/store/auth.actions';
import { UserMenuItem, NavMenuItem, AuthMenuItem } from '../core/core.model';

@Component({
  selector: 'eaf-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.sass']
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  public userMenu: UserMenuItem[];
  public navMenu: NavMenuItem[];
  public authMenu: AuthMenuItem[];
  public isAuth = false;
  public userState$: Observable<any>;

  private sub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private appStorage: AppStorageService,
    private authService: AuthService,
    private helper: HelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.store.select(fromRoot.getIsAuth)
      .subscribe(
        isAuth => {
          if (isAuth) {
            this.userMenu = this.appStorage.getUserMenu().slice(1);
            this.userState$ = this.store.select(fromRoot.getShortUserState);
            this.isAuth = isAuth;
          } else {
            this.navMenu = this.appStorage.getNavMenu();
          }
          this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth && item.name !== 'login');
        }
      );

  }

  onCloseMobileMenu() {
    this.store.dispatch(new UIAction.IsMobileMenuOpened(false));
    this.helper.preventBodyToScroll(false);
  }

  onAuthMenuClick(name: string) {
    this.onCloseMobileMenu();
    switch (name) {
      case 'profile':
        this.router.navigate(['main', 'profile']);
        break;
      case 'login':
        // TODO
        // when mockups will update
        break;
      case 'registration':
        this.store.dispatch(new UIAction.IsSignupFormOpened(true));
        this.helper.preventBodyToScroll(true);
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
    this.sub.unsubscribe();
  }

}
