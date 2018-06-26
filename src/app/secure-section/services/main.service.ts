import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';

import * as fromMain from '../store/main.reducer';
import * as MainActions from '../store/main.actions';
import { Statistic, StatisticByDate } from '../store/main.model';

@Injectable()
export class MainService {
  private dom: Document;
  private consolidatedData = {
    totalIncomeAmount: 23500,
    rebillsAmount: 18050,
    sellsAmount: 4989,
    uniqueVisitorsAmount: 324,
    sources: [
      'edu-affiliates.com',
      'fonts.google.com',
      'depositphotos.com',
      'сheapсustompapers.com',
      'plasticjam.github.com',
      'plasticjam.atlassian.net',
    ],
    sitesTraffic: [
      {
        name: '99papers',
        amount: 768,
        domain: ''
      },
      {
        name: 'bookwormlab',
        amount: 543,
        domain: ''
      },
      {
        name: 'essaybox',
        amount: 323,
        domain: ''
      },
      {
        name: 'essaywriter',
        amount: 188,
        domain: ''
      }
    ],
    // https://www.artlebedev.ru/country-list/
    geoTargets: [
      {
        name: 'United Kingdom',
        amount: 323,
        abbr: 'gb'
      },
      {
        name: 'Spain',
        amount: 256,
        abbr: 'es'
      },
      {
        name: 'Germany',
        amount: 209,
        abbr: 'de'
      },
      {
        name: 'Australia',
        amount: 187
      }
    ],
    deviceTypes: [
      {
        name: 'desktop',
        amount: 32300
      },
      {
        name: 'tablet',
        amount: 22301
      }
      ,        {
        name: 'phone',
        amount: 12300
      }
    ],
    lastNews:
    {
      id: 1,
      date: new Date(),
      title: 'Новые условия по рефералке',
      content: '',
      excerpt: `Добрый день! Сезон идет во всю, поэтому напоминанию о нашей реферальной программе,
        т.к. это источник постоянного пассивного дохода!`
    },
    lastDayIncomes: [
      {time: new Date(2018, 4, 30, 0), value: 0},
      {time: new Date(2018, 4, 30, 1), value: 0},
      {time: new Date(2018, 4, 30, 2), value: 1},
      {time: new Date(2018, 4, 30, 3), value: 2},
      {time: new Date(2018, 4, 30, 4), value: 3},
      {time: new Date(2018, 4, 30, 5), value: 2},
      {time: new Date(2018, 4, 30, 6), value: 1},
      {time: new Date(2018, 4, 30, 7), value: 0},
      {time: new Date(2018, 4, 30, 8), value: -1},
      {time: new Date(2018, 4, 30, 9), value: -2},
      {time: new Date(2018, 4, 30, 10), value: -3},
      {time: new Date(2018, 4, 30, 11), value: -4},
      {time: new Date(2018, 4, 30, 12), value: -5},
      {time: new Date(2018, 4, 30, 13), value: -4},
      {time: new Date(2018, 4, 30, 14), value: -3},
      {time: new Date(2018, 4, 30, 15), value: -2},
      {time: new Date(2018, 4, 30, 16), value: -1},
      {time: new Date(2018, 4, 30, 17), value: 0},
      {time: new Date(2018, 4, 30, 18), value: 1},
      {time: new Date(2018, 4, 30, 19), value: 2},
      {time: new Date(2018, 4, 30, 20), value: 3},
      {time: new Date(2018, 4, 30, 21), value: 4},
      {time: new Date(2018, 4, 30, 22), value: 5},
      {time: new Date(2018, 4, 30, 23), value: 10},
    ],
    lastDayConversions: [
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      }
    ]
  };

  private statisticByPeriod = {
    statistic: [
      {
        date: new Date(2018, 3, 1),
        uniques: 101,
        hits: 102,
        inquiries: 103,
        fakes: 104,
        sales: 105,
        salesIncome: 106,
        rebills: 107,
        rebillsIncome: 108,
        incomeOn1k: 109,
        salesOn1k: 110,
        chargeback: 111,
        refferers: 112,
        refferersIncome: 113,
        totalIncome: 114,
      },
      {
        date: new Date(2018, 3, 2),
        uniques: 200,
        hits: 200,
        inquiries: 200,
        fakes: 200,
        sales: 200,
        salesIncome: 200,
        rebills: 200,
        rebillsIncome: 200,
        incomeOn1k: 200,
        salesOn1k: 200,
        chargeback: 200,
        refferers: 200,
        refferersIncome: 200,
        totalIncome: 200,
      },
      {
        date: new Date(2018, 3, 3),
        uniques: 300,
        hits: 300,
        inquiries: 300,
        fakes: 300,
        sales: 300,
        salesIncome: 300,
        rebills: 300,
        rebillsIncome: 300,
        incomeOn1k: 300,
        salesOn1k: 300,
        chargeback: 300,
        refferers: 300,
        refferersIncome: 300,
        totalIncome: 300,
      },
      {
        date: new Date(2018, 3, 4),
        uniques: 400,
        hits: 400,
        inquiries: 400,
        fakes: 400,
        sales: 400,
        salesIncome: 400,
        rebills: 400,
        rebillsIncome: 400,
        incomeOn1k: 400,
        salesOn1k: 400,
        chargeback: 400,
        refferers: 400,
        refferersIncome: 400,
        totalIncome: 400,
      },
    ],
    conversions: [
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
      {
        date: new Date(),
        site: '99papers.com',
        orderId: 123456,
        amount: 80
      },
      {
        date: new Date(),
        site: 'essaybox.org',
        orderId: 654321,
        amount: 55
      },
    ],
    incomes: [
      {time: new Date(2018, 4, 30, 0), value: 0},
      {time: new Date(2018, 4, 30, 1), value: 0},
      {time: new Date(2018, 4, 30, 2), value: 1},
      {time: new Date(2018, 4, 30, 3), value: 2},
      {time: new Date(2018, 4, 30, 4), value: 3},
      {time: new Date(2018, 4, 30, 5), value: 2},
      {time: new Date(2018, 4, 30, 6), value: 1},
      {time: new Date(2018, 4, 30, 7), value: 0},
      {time: new Date(2018, 4, 30, 8), value: -1},
      {time: new Date(2018, 4, 30, 9), value: -2},
      {time: new Date(2018, 4, 30, 10), value: -3},
      {time: new Date(2018, 4, 30, 11), value: -4},
      {time: new Date(2018, 4, 30, 12), value: -5},
      {time: new Date(2018, 4, 30, 13), value: -4},
      {time: new Date(2018, 4, 30, 14), value: -3},
      {time: new Date(2018, 4, 30, 15), value: -2},
      {time: new Date(2018, 4, 31, 16), value: -1},
    ],
    pixelTracking: [
      {
        date: new Date(),
        startedFillOrderForm: 1,
        startedFillInquiryForm: 2,
        orderCreated: 3,
        inquiryCreated: 4,
        orderPaid: 5,
        userRegistered: 6,
        onlineChat: 7
      },
      {
        date: new Date(),
        startedFillOrderForm: 11,
        startedFillInquiryForm: 12,
        orderCreated: 13,
        inquiryCreated: 14,
        orderPaid: 15,
        userRegistered: 16,
        onlineChat: 17
      },
    ],
    countries: [
      {
        name: 'United Kingdom',
        amount: 4323,
        abbr: 'gb'
      },
      {
        name: 'Spain',
        amount: 556,
        abbr: 'es'
      },
      {
        name: 'Germany',
        amount: 209,
        abbr: 'de'
      },
      {
        name: 'Australia',
        amount: 187,
        abbr: 'au'
      },
      {
        name: 'United States',
        amount: 180,
        abbr: 'us'
      },
      {
        name: 'Ireland',
        amount: 107,
        abbr: 'au'
      },
      {
        name: 'Scotland',
        amount: 100,
        abbr: 'sc'
      },
      {
        name: 'France',
        amount: 90,
        abbr: 'fr'
      },
      {
        name: 'Italy',
        amount: 89,
        abbr: 'it'
      },
      {
        name: 'Czech',
        amount: 87,
        abbr: 'cz'
      },
    ],
    deviceTypes: [
      {
        name: 'desktop',
        amount: 32300
      },
      {
        name: 'tablet',
        amount: 9230
      }
      ,        {
        name: 'phone',
        amount: 1230
      }
    ],
    os: [
      {
        name: 'windows',
        amount: 323
      },
      {
        name: 'os x',
        amount: 322
      },
      {
        name: 'linux',
        amount: 321
      },
      {
        name: 'android',
        amount: 320
      },
      {
        name: 'iOS',
        amount: 319
      },
    ],
    browsers: [
      {
        name: 'Chrome',
        amount: 500
      },
      {
        name: 'FireFox',
        amount: 400
      },
      {
        name: 'Safari',
        amount: 300
      },
      {
        name: 'Edge',
        amount: 200
      },
      {
        name: 'IE',
        amount: 100
      },
    ],
    filters: [
      {name: 'dsc',
       filterList: [{name: 'DSC001', enabled: false}, {name: 'DSC002', enabled: false}, {name: 'DSC003', enabled: false}]
      },
      {name: 'subid',
      filterList: [{name: '1001', enabled: false}, {name: '1002', enabled: false}, {name: '1003', enabled: false}]
      },
      {name: 'deviceTypes',
      filterList: [{name: 'desktop', enabled: false}, {name: 'tablet', enabled: false}, {name: 'mobile', enabled: false}, {name: 'other', enabled: false}]
      },
      {name: 'os',
      filterList: [{name: 'windows', enabled: false}, {name: 'osx', enabled: false}, {name: 'linux', enabled: false}, {name: 'android', enabled: false}, {name: 'iOS', enabled: false}]
      },
      {name: 'browsers', filterList: [{name: 'Chrome', enabled: false}, {name: 'FireFox', enabled: false}, {name: 'Safari', enabled: false}, {name: 'Edge', enabled: false}, {name: 'IE',  enabled: false}]
      },
      {name: 'countries',
      filterList: [
        {name: 'United Kingdom', amount: 323,
          enabled: false, abbr: 'gb'},
        {name: 'Spain', amount: 256,
        enabled: false, abbr: 'es'},
        {name: 'Germany', amount: 209,
        enabled: false, abbr: 'de'},
        {name: 'Australia', amount: 187,
        enabled: false, abbr: 'au' }
      ]}
    ]
  };

  private filteredStatistic: {statistic: Statistic[]} = {
    statistic: [
    {
      date: new Date(2018, 3, 1),
      uniques: 69069,
      hits: 6902,
      inquiries: 6903,
      fakes: 6904,
      sales: 6905,
      salesIncome: 6906,
      rebills: 6907,
      rebillsIncome: 6908,
      incomeOn1k: 6909,
      salesOn1k: 69690,
      chargeback: 696969,
      refferers: 69692,
      refferersIncome: 69693,
      totalIncome: 69694,
    },
    {
      date: new Date(2018, 3, 2),
      uniques: 299,
      hits: 299,
      inquiries: 299,
      fakes: 299,
      sales: 299,
      salesIncome: 299,
      rebills: 299,
      rebillsIncome: 299,
      incomeOn1k: 299,
      salesOn1k: 299,
      chargeback: 299,
      refferers: 299,
      refferersIncome: 299,
      totalIncome: 299,
    },
    {
      date: new Date(2018, 3, 3),
      uniques: 399,
      hits: 399,
      inquiries: 399,
      fakes: 399,
      sales: 399,
      salesIncome: 399,
      rebills: 399,
      rebillsIncome: 399,
      incomeOn1k: 399,
      salesOn1k: 399,
      chargeback: 399,
      refferers: 399,
      refferersIncome: 399,
      totalIncome: 399,
    },
    {
      date: new Date(2018, 3, 4),
      uniques: 499,
      hits: 499,
      inquiries: 499,
      fakes: 499,
      sales: 499,
      salesIncome: 499,
      rebills: 499,
      rebillsIncome: 499,
      incomeOn1k: 499,
      salesOn1k: 499,
      chargeback: 499,
      refferers: 499,
      refferersIncome: 499,
      totalIncome: 499,
    },
  ]};

  private statisticByDay = {
    date: new Date(),
    totalIncome: 200.25,
    data: [
      {
        creationDate: new Date(2018, 4, 11),
        paymentDate: new Date(2018, 4, 12),
        clientId: 101,
        country: 'USA',
        status: 'status',
        orderId: 123456,
        subId: 223344,
        site: '97papers.com',
        title: 'my title',
        serviceType: 'Research paper',
        orderAmount: 50.5,
        ratio: 0.15,
        orderIncome: 2.15,
      },
      {
        creationDate: new Date(2018, 4, 13),
        paymentDate: new Date(2018, 4, 14),
        clientId: 111,
        country: 'Canada',
        status: 'status',
        orderId: 123456,
        subId: 223344,
        site: '98papers.com',
        title: 'my title 2',
        serviceType: 'Research paper Alchemy',
        orderAmount: 1050.5,
        ratio: 0.15,
        orderIncome: 112.15,
      }
    ]
  };

  private transactionsByPeriod = [
    {
      id: 1,
      date: new Date(),
      amount: 200,
      type: '????????',
      method: 'Pay Pal',
      status: 'paid',
      details: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
      comments: 'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. '
    },
    {
      id: 2,
      date: new Date(),
      amount: 100,
      type: '????????',
      method: 'Pay Pal',
      status: 'paid',
      details: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
      comments: 'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. '
    },
    {
      id: 3,
      date: new Date(),
      amount: 300,
      type: '????????',
      method: 'Pay Pal',
      status: 'paid',
      details: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
      comments: 'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. '
    }
  ];

  private news = {
    more: true,
    lastFetched: 2,
    news: [
      {
        id: 1,
        date: new Date(2018, 5, 10),
        title: 'Новые условия по рефералке',
        content: `<p>Добрый день!</p><br><p class="small-text" style="ma">Сезон идет во всю,
        поэтому напоминанию о нашей реферальной программе, т.к. это источник постоянного пассивного дохода!<p>`,
        excerpt: `Добрый день! Сезон идет во всю, поэтому напоминанию о нашей реферальной программе,
          т.к. это источник постоянного пассивного дохода!`
      },
      {
        id: 2,
        date: new Date(2018, 4, 20),
        title: 'EDU-AFFILIATES.COM - С НАСТУПАЮЩИМ НОВЫМ ГОДОМ И РОЖДЕСТВОМ!',
        content: `<p>Уважаемые партнеры!</p><br><p class="small-text" style="ma">Хотим напомнить Вам, что весенний сезон в самом разгаре.
        <br><br> Несмотря на сумасшедшую загрузку, наша команда подготовила пару приятных новостей:<br><br><p>`,
        excerpt: `Уважаемые партнеры! Хотим напомнить Вам, что весенний сезон в самом разгаре.`
      }
    ]
  };

  private discountIntro = {
    visitorsLastMonth: 3301,
    uniquesLastMonth: 212
  };

  private discountDetails = {
    visitorsLastMonth: 3301,
    uniquesLastMonth: 212,
    availableCoupons: 24,
    usedCoupons: 1,
    totalActiveCoupons: 15,
    totalExpiredCoupons: 23,
    sources: ['edu-affiliates.com', 'fonts.google.com', 'depositphotos.com', 'сheapсustompapers.com', 'plasticjam.github.com'],
    activeCoupons: [
      {
        name: 'AA11QQ21',
        group: 'coupon',
        site: '97papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 12,
        usageAmount: 1
      },
      {
        name: 'AA11QQ22',
        group: 'coupon',
        site: '98papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 7,
        usageAmount: 11
      },
      {
        name: 'AA11QQ23',
        group: 'coupon',
        site: '99papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 2,
        usageAmount: 111,
      }
    ],
    expiredCoupons: [
      {
        name: 'BB11QQ21',
        group: 'coupon',
        site: '97papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 12,
        usageAmount: 1
      },
      {
        name: 'BB11QQ22',
        group: 'coupon',
        site: '98papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 7,
        usageAmount: 11
      },
      {
        name: 'BB11QQ23',
        group: 'coupon',
        site: '99papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 2,
        usageAmount: 111
      }
    ],
  };

  private promoData = {
    coupons: [
      {
        name: 'AA11QQ21',
        group: 'coupon',
        site: '99papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 12,
        usageAmount: 1
      },
      {
        name: 'AA11QQ22',
        group: 'coupon',
        site: '99papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 7,
        usageAmount: 11
      },
      {
        name: 'AA11QQ23',
        group: 'coupon',
        site: '99papers.cum',
        creationDate: new Date(),
        expirationDate: new Date(),
        discountValue: 2,
        usageAmount: 111,
      }
    ],
    staticBanners: [
      {
        id: 1,
        title: 'The Best Essay Writing Service',
        size: '160x600 px',
        category: 'Статический баннер',
        bannerSrc: '/assets/images/promo/sbanners/banner1.svg'
      },
      {
        id: 2,
        title: 'The Best Essay Writing Service',
        size: '300x250 px',
        category: 'Статический баннер',
        bannerSrc: '/assets/images/promo/sbanners/banner2.svg'
      },
      {
        id: 3,
        title: 'The Best Essay Writing Service',
        size: '300x600 px',
        category: 'Статический баннер',
        bannerSrc: '/assets/images/promo/sbanners/banner3.svg'
      }
    ],
    animatedBanners: [
      {
        id: 2,
        title: 'The Best Essay Writing Service',
        size: '300x250 px',
        category: 'Animated баннер',
        bannerSrc: '/assets/images/promo/abanners/banner2.svg'
      },
      {
        id: 3,
        title: 'The Best Essay Writing Service',
        size: '300x600 px',
        category: 'Animated баннер',
        bannerSrc: '/assets/images/promo/abanners/banner3.svg'
      }
    ],
    wpThemes: [
      {
        id: 1,
        name: 'WP Theme v01',
        preview: '/assets/images/header/sites/preview-essaybox.org.svg',
        instructions: `
        <ol>
          <li>
              Скачайте файл: <a href="https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip">wp_theme_99papers-master.zip</a>
          </li>
          <li>
              Поместите тему в <span class="accent-color">wp-content/themes/</span> и активируйте, используя админ панель WordPress
          </li>
          <li>
              Добавьте .htaccess файл при необходимости.
          </li>
          <li>
              Отредактируйте 3 строку в <span class="accent-color">wp-content/themes/&lt;theme_name&gt;/header.php</span> поместив ваш ref_id
          </li>
        </ol>`,
        downloadLink: 'https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip',
        demoLink: 'https://edu-affiliates.com/ru/promo/site/4/'
      }
    ],
    landingThemes: [
      {
        id: 1,
        name: 'WP Landing v01',
        preview: '/assets/images/header/sites/preview-essaybox.org.svg',
        instructions: `
        <ol>
          <li>
              Скачайте файл: <a href="https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip">wp_theme_99papers-master.zip</a>
          </li>
          <li>
              Поместите тему в <span class="accent-color">wp-content/themes/</span> и активируйте, используя админ панель WordPress
          </li>
          <li>
              Добавьте .htaccess файл при необходимости.
          </li>
          <li>
              Отредактируйте 3 строку в <span class="accent-color">wp-content/themes/&lt;theme_name&gt;/header.php</span> поместив ваш ref_id
          </li>
        </ol>`,
        downloadLink: 'https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip',
        demoLink: 'https://edu-affiliates.com/ru/promo/site/4/'
      }
    ],
    calculator: {
      scriptSrc: 'https://s3.amazonaws.com/genericapps/resources/calculators/bundle41.js',
      scriptEduObj: {
        'hostname': '99papers.com',
        'website_id': 432,
        'service_ids': '1674, 1675, 1673, 1690',
        'new_api': false,
        'segment_id': 'А',
        'no_stat': true,
        'email': false,
        'dsc': 'ESSAYFIRST5',
      },
      styleSrc: 'https://s3.amazonaws.com/genericapps/resources/calculators/styles.css',
      calcColSchs: [],
      calcViews: [],
    }
  };

  private pTEventsDetails = {
    eventName: 'startedFillOrderForm',
    data: [
      {
        date: new Date(2018, 4, 20, 13, 20),
        site: '99papers.com',
        responseStatus: 200,
        messageStatus: 'success',
        eventDetails: `tracking={tracking} site={site} event={event} rid={rid} - ref_Id вебмастера sid={sid} - sub_id click_id={click_id}
        user_id={user_id} user_geo={user_geo} user_device={user_device} transaction_id={transaction_id} date_paid={date_paid}
        order_status={order_status} order_title={order_title} order_service={order_service} order_discipline={order_discipline}
        order_amount={order_amount} order_coeff={order_coeff} order_profit={order_profit} order_id={order_id}`
      },
      {
        date: new Date(2018, 4, 20, 15, 40),
        site: 'essaybox.com',
        responseStatus: 200,
        messageStatus: 'success',
        eventDetails: `tracking={tracking} site={site} event={event} rid={rid} - ref_Id вебмастера sid={sid} - sub_id click_id={click_id}
        user_id={user_id} user_geo={user_geo} user_device={user_device} transaction_id={transaction_id} date_paid={date_paid}
        order_status={order_status} order_title={order_title} order_service={order_service} order_discipline={order_discipline}
        order_amount={order_amount} order_coeff={order_coeff} order_profit={order_profit} order_id={order_id}
        tracking={tracking} site={site} event={event} rid={rid} - ref_Id вебмастера sid={sid} - sub_id click_id={click_id}
        user_id={user_id} user_geo={user_geo} user_device={user_device} transaction_id={transaction_id} date_paid={date_paid}
        order_status={order_status} order_title={order_title} order_service={order_service} order_discipline={order_discipline}
        order_amount={order_amount} order_coeff={order_coeff} order_profit={order_profit} order_id={order_id}`
      },
    ]
  };

  constructor(
    private store: Store<fromMain.MainState>,
    @Inject( DOCUMENT ) dom: Document,
  ) {
    this.dom = dom;
  }

  fetchConsolidatedData() {
  //   this.store.dispatch(new MainActions.FetchConsolidatedData(this.consolidatedData));
    return this.consolidatedData;
  }

  fetchStatisticByPeriod() {
    // console.log('fetchStatisticByPeriod from Service');
    // this.store.dispatch(new MainActions.FetchStatistic(this.statisticByPeriod));
    return this.statisticByPeriod;
  }

  fetchTransactionsByPeriod(query) {
    // console.log('fetchTransactionsByPeriod from Service');
    this.store.dispatch(new MainActions.FetchTransactions(this.transactionsByPeriod));
  }

  fetchNews() {
    this.store.dispatch(new MainActions.FetchNews(this.news));
  }

  fetchDiscountIntro() {
    this.store.dispatch(new MainActions.FetchDiscountIntro(this.discountIntro));
  }

  fetchDiscountDetails() {
    this.store.dispatch(new MainActions.FetchDiscountDetails(this.discountDetails));
  }

  fetchStatisticByDate(date) {
    return this.statisticByDay;
  }

  fetchPTEventsDetails({date: Date, eventName: string}) {
    return this.pTEventsDetails;
  }

  fetchFilteredStatistic(): {statistic: Statistic[]} {
    return this.filteredStatistic;
  }

  fetchPromoData(id: number) {
    return {...this.promoData};
  }

  getRefLink(siteName: string, id: number, params?: string): string {
    let baseRefLink = 'https://' + siteName.toLowerCase() + '/?ref_id=' + id;
    if (params) {
      baseRefLink += '&page=' + encodeURIComponent(params);
    }
    return baseRefLink;
  }

  copyToClipboard(value: string): Promise<any> {
    const promise = new Promise(
      (resolve, reject): void => {
        let textarea = null;
        try {
          textarea = this.dom.createElement('textarea');
          textarea.style.width = '0';
          textarea.style.height = '0';
          textarea.style.top = '0';
          textarea.style.left = '0';
          textarea.style.position = 'fixed';
          textarea.style.fontSize = '20px';  // to avoid focus textarea on select
          textarea.style.opacity = '0';
          textarea.style.zIndex = '-1';
          textarea.contenteditable = true;
          textarea.readonly = false;
          this.dom.body.appendChild(textarea);
          textarea.textContent = value;

          if (navigator && navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            // It's tricky to copy on iOS browsers
            const range = this.dom.createRange();
            range.selectNodeContents(textarea);

            const selection = this.dom.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textarea.setSelectionRange(0, 999999);

          } else {
            textarea.select();
          }

          this.dom.execCommand('copy');
          textarea.blur();

          resolve(value);
        } finally {
          if (textarea && textarea.parentNode) {
            textarea.parentNode.removeChild(textarea);
          }
        }
      }
    );
    return (promise);
  }
}
