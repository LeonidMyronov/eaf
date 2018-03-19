import { Injectable } from '@angular/core';

@Injectable()
export class AppStorageService {
  private navMenu = [
    {
      name: 'tariffs',
      url: '/tariffs'
    },
    {
      name: 'contacts',
      url: '/contacts'
    }
  ];

  private langsList = [
    {
      name: 'russian',
      abbr: 'ru',
      img: '/assets/images/header/lang-ru.svg'
    },
    {
      name: 'english',
      abbr: 'en',
      img: '/assets/images/header/lang-en.svg'
    }
  ];

  private userMenu = [
    {
      name: 'signup',
      item_class: 'primary'
    },
    {
      name: 'login',
      item_class: 'secondary'
    },
    {
      name: 'profile',
      item_class: 'primary'
    },
    {
      name: 'logout',
      item_class: 'secondary'
    }
  ];
  constructor() {}

  getNavMenu() { return [...this.navMenu]; }
  getUserMenu() { return [...this.userMenu]; }
  getLangsList() { return [...this.langsList]; }


}
