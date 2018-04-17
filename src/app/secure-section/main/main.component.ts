import { Component, OnInit } from '@angular/core';

import { AppStorageService } from '../../core/app-storage.service';

@Component({
  selector: 'eaf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {
  userMenu: any[];
  constructor(
    private appStorage: AppStorageService,
  ) { }

  ngOnInit() {
    this.userMenu = this.appStorage.getUserMenu();
    console.log(this.userMenu);
  }

}
