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

  private authMenu = [
    {
      name: 'registration',
      item_class: 'primary',
      url: '/sign-up',
      auth: false
    },
    {
      name: 'login',
      item_class: 'secondary',
      url: '/login',
      auth: false
    },
    {
      name: 'profile',
      item_class: 'primary',
      auth: true
    },
    {
      name: 'logout',
      item_class: 'secondary',
      auth: true
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

  private workTypes = [
    'Essays',
    'Term papers',
    'Speeches',
    'Dissertations',
    'Thesis papers',
    'Research papers',
    'PowerPoint Presentations',
    'Business writing'
  ];

  private homeSection5Cards = [
    {
      imgSrc: '/assets/images/home/home-5-img-1.svg',
      description: 'Лучшие работы от лучших авторов',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-2.svg',
      description: 'Средняя цена заказа - ',
      badge: '$131',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-3.svg',
      description: 'Лучший пассивный доход: ',
      badge: '5 ребилов с клиента',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-4.svg',
      description: 'Креативные баннеры и платники, ',
      badge: 'которые конвертят',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-5.svg',
      description: 'Лучший конверт в нише: ',
      badge: 'до 9%!',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-6.svg',
      description: 'Своевременные выплаты',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-7.svg',
      description: 'Выплаты через ',
      badge: 'Webmoney, PayPal, Epese, Wire Transfer',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-8.svg',
      description: 'Статистика в реальном времени',
    },
    {
      imgSrc: '/assets/images/home/home-5-img-9.svg',
      description: 'Отличный саппорт',
    },
  ];

  constructor() {}

  getNavMenu() { return [...this.navMenu]; }
  getAuthMenu() { return [...this.authMenu]; }
  getLangsList() { return [...this.langsList]; }
  getCountryList() { return [...this.countryList]; }
  getHomeSection1Cards() { return [...this.homeSection1Cards]; }
  getWorkTypes() { return [...this.workTypes]; }
  getHomeSection5Cards() { return [...this.homeSection5Cards]; }
}
