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
    },
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
      name: 'england',
      abbr: 'uk',
      img: '/assets/images/header/lang-uk.svg'
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

  private userMenu = [
    {
      name: 'promo',
      iconSrc: '',
      url: 'main/promo'
    },
    {
      name: 'today',
      iconSrc: '/assets/images/main/user-menu/icon-today.svg',
      url: 'main/today'
    },
    {
      name: 'statistic',
      iconSrc: '/assets/images/main/user-menu/icon-statistic.svg',
      url: 'main/statistic'
    },
    {
      name: 'post back',
      iconSrc: '/assets/images/main/user-menu/icon-postback.svg',
      url: 'main/postback'
    },
    {
      name: 'balance',
      iconSrc: '/assets/images/main/user-menu/icon-balance.svg',
      url: 'main/balance'
    },
    {
      name: 'whiteLabel',
      iconSrc: '/assets/images/main/user-menu/icon-whitelabel.svg',
      url: 'main/whitelabel'
    },
    {
      name: 'offer',
      iconSrc: '/assets/images/main/user-menu/icon-offer.svg',
      url: 'main/offer'
    },
    {
      name: 'guide',
      iconSrc: '/assets/images/main/user-menu/icon-guide.svg',
      url: 'main/guide'
    },
    {
      name: 'news',
      iconSrc: '/assets/images/main/user-menu/icon-news.svg',
      url: 'main/news'
    },
    {
      name: 'support',
      iconSrc: '/assets/images/main/user-menu/icon-support.svg',
      url: 'main/support'
    },
  ];
  private homeSection1Cards = [
    {
      iconSrc: '/assets/images/home/home-1-icon-comission.svg',
      imgSrc: '/assets/images/home/home-1-img-comission.svg',
      description: 'comission',
      badge: 'from',
      title: '50%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-rebills.svg',
      imgSrc: '/assets/images/home/home-1-img-rebills.svg',
      description: 'rebills',
      badge: 'from',
      title: '20%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-conversion.svg',
      imgSrc: '/assets/images/home/home-1-img-conversion.svg',
      description: 'conversion',
      badge: 'from',
      title: '9%'
    },
    {
      iconSrc: '/assets/images/home/home-1-icon-payments.svg',
      imgSrc: '/assets/images/home/home-1-img-payments.svg',
      description: 'payments',
      title: 'on request'
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
      id: 1,
    },
    {
      imgSrc: '/assets/images/home/home-5-img-2.svg',
      description: 'Средняя цена заказа - ',
      badge: '$131',
      id: 2
    },
    {
      imgSrc: '/assets/images/home/home-5-img-3.svg',
      description: 'Лучший пассивный доход: ',
      badge: '5 ребилов с клиента',
      id: 3
    },
    {
      imgSrc: '/assets/images/home/home-5-img-4.svg',
      description: 'Креативные баннеры и платники, ',
      badge: 'которые конвертят',
      id: 4
    },
    {
      imgSrc: '/assets/images/home/home-5-img-5.svg',
      description: 'Лучший конверт в нише: ',
      badge: 'до 9%!',
      id: 5
    },
    {
      imgSrc: '/assets/images/home/home-5-img-6.svg',
      description: 'Своевременные выплаты',
      id: 6
    },
    {
      imgSrc: '/assets/images/home/home-5-img-7.svg',
      description: 'Выплаты через ',
      badge: 'Webmoney, PayPal, Epese, Wire Transfer',
      id: 7
    },
    {
      imgSrc: '/assets/images/home/home-5-img-8.svg',
      description: 'Статистика в реальном времени',
      id: 8
    },
    {
      imgSrc: '/assets/images/home/home-5-img-9.svg',
      description: 'Отличный саппорт',
      id: 9
    },
  ];

  private timeList = [
    {
      id: 1,
      name: 'server'
    },
    {
      id: 2,
      name: 'home'
    }
  ];

  private tariffsList = [
    {
      id: 1,
      siteName: 'All sites',
      iconSrc: '/assets/images/header/sites/site-all.svg',
    },
    {
      id: 2,
      siteName: '99papers.com',
      iconSrc: '/assets/images/header/sites/site-99papers.svg',
      fisrtOrderPercent: 50,
      rebillsPercent: 15
    },
    {
      id: 3,
      siteName: 'EssayBox.org',
      iconSrc: '/assets/images/header/sites/site-essaybox.svg',
      fisrtOrderPercent: 30,
      rebillsPercent: 25
    },
    {
      id: 4,
      siteName: 'EssayFactory.uk',
      iconSrc: '/assets/images/header/sites/site-essayfactory.svg',
      fisrtOrderPercent: 45,
      rebillsPercent: 15
    },
    {
      id: 5,
      siteName: 'BookwarmLab.com',
      iconSrc: '/assets/images/header/sites/site-bookwarmlab.svg',
      fisrtOrderPercent: 40,
      rebillsPercent: 10
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
  getUserMenu() {return [...this.userMenu]; }
  getTimeList() {return [...this.timeList]; }
  getTariffsList() {return this.tariffsList.slice(1); }
}
