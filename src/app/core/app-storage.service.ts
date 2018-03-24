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
      name: 'usa',
      abbr: 'us',
      img: '/assets/images/header/lang-us.svg'
    },
  ];

  private countryList = [
    {
      name: 'usa',
      abbr: 'us',
      img: '/assets/images/header/lang-us.svg'
    },
    {
      name: 'canada',
      abbr: 'ca',
      img: '/assets/images/header/lang-ca.svg'
    },
    {
      name: 'australia',
      abbr: 'au',
      img: '/assets/images/header/lang-au.svg'
    },
    {
      name: 'english',
      abbr: 'en',
      img: '/assets/images/header/lang-en.svg'
    }
  ];

  private userMenu = [
    {
      name: 'registration',
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

  private homeSection1Cards = [
    {
      iconSrc: '/assets/images/home/home-1-icon-comission.svg',
      imgSrc: '/assets/images/home/home-1-img-comission.svg',
      description: 'comission',
      badge: 'от',
      title: '50%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-rebills.svg',
      imgSrc: '/assets/images/home/home-1-img-rebills.svg',
      description: 'rebills',
      badge: 'от',
      title: '20%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-conversion.svg',
      imgSrc: '/assets/images/home/home-1-img-conversion.svg',
      description: 'conversion',
      badge: 'от',
      title: '9%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-payments.svg',
      imgSrc: '/assets/images/home/home-1-img-payments.svg',
      description: 'payments',
      title: 'по запросу'
    }
  ];
  constructor() {}

  getNavMenu() { return [...this.navMenu]; }
  getUserMenu() { return [...this.userMenu]; }
  getLangsList() { return [...this.langsList]; }
  getCountryList() { return [...this.countryList]; }
  getHomeSection1Cards() { return [...this.homeSection1Cards]; }


}
