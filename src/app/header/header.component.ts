import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStorageService } from '../core/app-storage.service';
import { HelperService } from '../core/helper.service';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';
import * as fromRoot from '../app.reducers';
import * as UIAction from '../ui/ui.actions';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: any;
  public authMenu: any;
  public userLang = 'us';
  public isMobileMenuOpened = false;

  public langsList: any;
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
          this.navMenu = this.appStorage.getNavMenu();
          this.authMenu = this.appStorage.getAuthMenu().filter(item => item.auth === isAuth);
        }
      );
    this.store.select(fromRoot.getShortUserState)
      .subscribe( response => console.log('userState => ', response));

    this.langsList = this.appStorage.getLangsList();
  }

  onChangeLang(lang: any) {
    // debugger;
    this.userLang = lang.abbr;
  }

  toggleMobileMenu() {

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
