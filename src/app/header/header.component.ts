import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { AppStorageService } from '../core/app-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: any;
  public userMenu: any;

  public langsList: any;
  public activeLang = 'ru';
  constructor(
    private appStorage: AppStorageService
  ) { }

  ngOnInit() {
    this.navMenu = this.appStorage.getNavMenu();
    this.userMenu = this.appStorage.getUserMenu();
    this.langsList = this.appStorage.getLangsList();
  }

}
