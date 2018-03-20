import { Component, OnInit } from '@angular/core';

import { AppStorageService } from '../core/app-storage.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  public deployPath = environment.deployPath;
  public navMenu: any;
  constructor(private appStorage: AppStorageService) { }

  ngOnInit() {
    this.navMenu = this.appStorage.getNavMenu();
  }

}
