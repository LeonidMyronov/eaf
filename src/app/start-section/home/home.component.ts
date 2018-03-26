import { Component, OnInit } from '@angular/core';

import { AppStorageService } from '../../core/app-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public homeSection1Cards;
  public countryList;
  public workTypes;
  constructor(
    private appStorage: AppStorageService
  ) { }

  ngOnInit() {
    this.homeSection1Cards = this.appStorage.getHomeSection1Cards();
    this.countryList = this.appStorage.getCountryList();
    this.workTypes = this.appStorage.getWorkTypes();
  }

}
