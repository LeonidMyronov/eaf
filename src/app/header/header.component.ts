import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStorageService } from '../core/app-storage.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: any;
  public userMenu: any;
  public userLang = 'us';
  public isMobileMenuOpened = false;

  public langsList: any;
  constructor(
    private appStorage: AppStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.navMenu = this.appStorage.getNavMenu();
    this.userMenu = this.appStorage.getUserMenu();
    this.langsList = this.appStorage.getLangsList();
  }

  onChangeLang(lang: any) {
    // debugger;
    this.userLang = lang.abbr;
  }

  toggleMobileMenu() {

  }

  onUserMenuClick(url: string) {
    debugger;
    this.router.navigate([`${url}`]);
  }
}
