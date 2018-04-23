import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStorageService } from '../core/app-storage.service';
import { AuthService } from '../auth/auth.service';
import { HelperService } from '../core/helper.service';

import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';

@Component({
  selector: 'eaf-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.sass']
})
export class MobileMenuComponent implements OnInit {
  public userMenu: any[];
  public navMenu: any[];
  public authMenu: any[];
  public isAuth = false;
  public userState$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private appStorage: AppStorageService,
    private authService: AuthService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.store.select(fromRoot.getIsAuth)
      .subscribe(
        isAuth => {
          if (isAuth) {
            this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth);
            this.userMenu = this.appStorage.getUserMenu().slice(1);
            this.userState$ = this.store.select(fromRoot.getShortUserState);
            this.isAuth = isAuth;
          } else {
            this.navMenu = this.appStorage.getNavMenu();
          }
        }
      );

  }

  onCloseMobileMenu() {
    this.store.dispatch(new UIAction.IsMobileMenuOpened(false));
  }

  onAuthMenuClick(name: string) {
    // this.router.navigate([`${url}`]);
    this.helper.preventBodyToScroll(true);
    this.onCloseMobileMenu();
    switch (name) {
      case 'profile':
        // TODO
        break;
      case 'registration':
        this.store.dispatch(new UIAction.IsSignupFormOpened(true));
        break;
        case 'logout':
        this.authService.logout();
        break;
      default:
        console.log(name);
    }
  }

}
