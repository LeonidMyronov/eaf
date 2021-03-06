import { Injectable } from '@angular/core';
import { Site, TimeList, NavMenuItem, UserMenuItem, AuthMenuItem, LangListItem } from './core.model';

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
      url: '/main/profile',
      auth: true
    },
    {
      name: 'logout',
      item_class: 'secondary',
      url: '/',
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
      name: 'All sites',
      iconSrc: '/assets/images/header/sites/site-all.svg',
      iconLightSrc: '/assets/images/header/sites/site-all-light.svg',
    },
    {
      id: 2,
      name: '99papers.com',
      iconSrc: '/assets/images/header/sites/site-99papers.svg',
      fisrtOrderPercent: 50,
      rebillsPercent: 15,
      iconLightSrc: '/assets/images/header/sites/site-99papers-light.svg',
      preview: '/assets/images/header/sites/preview-99papers.com.svg',
      isDesktopVersion: true,
      isMobileVersion: true,
      description: `Абсолютный лидер в нише essay writing! Сервис предоставляет исключительное качество услуг по написанию эссе,
       исследовательских работ, курсовых, тезисов, отчетов или диссертаций. Работы выполняются исключительно американскими райтерами,
       что позволяет удовлетворять самых взыскательных клиентов.`
    },
    {
      id: 3,
      name: 'EssayBox.org',
      iconSrc: '/assets/images/header/sites/site-essaybox.svg',
      fisrtOrderPercent: 30,
      rebillsPercent: 25,
      iconLightSrc: '/assets/images/header/sites/site-essaybox-light.svg',
      preview: '/assets/images/header/sites/preview-essaybox.org.svg',
      isDesktopVersion: true,
      isMobileVersion: true,
      description: `Сервис предоставляет исключительное качество услуг по написанию эссе, исследовательских работ, курсовых,
       тезисов, отчетов или диссертаций. Работы выполняются исключительно американскими райтерами, что позволяет удовлетворять
        самых взыскательных клиентов.`
    },
    {
      id: 4,
      name: 'EssayFactory.uk',
      iconSrc: '/assets/images/header/sites/site-essayfactory.svg',
      fisrtOrderPercent: 45,
      rebillsPercent: 15,
      iconLightSrc: '/assets/images/header/sites/site-essayfactory-light.svg',
      preview: '/assets/images/header/sites/preview-essayfactory.uk.svg',
      isDesktopVersion: true,
      isMobileVersion: true,
      description: `Наш новый сайт был тщательно разработан для UK рынка. Мы наняли профессиональных авторов из UK,
       которые точно знают как удовлетворить требования своих клиентов. Эссей рынок UK в общем дороже из-за высокой
        платежеспособности студентов, многие из которых приезжают из Арабских стран. В результате, это приносит большую
        прибыль нашим партнерам.`
    },
    {
      id: 5,
      name: 'BookwormLab.com',
      iconSrc: '/assets/images/header/sites/site-bookwormlab.svg',
      fisrtOrderPercent: 40,
      rebillsPercent: 10,
      iconLightSrc: '/assets/images/header/sites/site-bookwormlab-light.svg',
      preview: '/assets/images/header/sites/preview-bookwormlab.com.svg',
      isDesktopVersion: true,
      isMobileVersion: false,
      description: `Самый надежный сайт в нише essay writing!
      BookwormLab.com обслуживает клиентов с 2008 и успешно выполнил тысячи заказов! На работу нанимаются только носители языка,
       имеющие профильное образование, что позволяет выполнять работы на высшем уровне. В среднем каждый клиент заказывает около
        6 работ при среднем чеке более $120.`
    },
  ];

  constructor() {}

  getNavMenu(): NavMenuItem[] { return [...this.navMenu]; }
  getAuthMenu(): AuthMenuItem[] { return [...this.authMenu]; }
  getLangsList(): LangListItem[] { return [...this.langsList]; }
  getCountryList() { return [...this.countryList]; }
  getHomeSection1Cards() { return [...this.homeSection1Cards]; }
  getWorkTypes() { return [...this.workTypes]; }
  getHomeSection5Cards() { return [...this.homeSection5Cards]; }
  getUserMenu(): UserMenuItem[] {return [...this.userMenu]; }
  getTimeList(): TimeList[] {return [...this.timeList]; }
  // getTariffsList(): Site[] {return this.tariffsList.slice(1); }
  getAllSites(): Site[] {return this.tariffsList.slice(); }
}
