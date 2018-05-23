import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMain from '../store/main.reducer';
import * as MainActions from '../store/main.actions';
import { Statistic } from '../store/main.model';

@Injectable()
export class MainService {
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
        usageAmount: 111
      }
    ],
    expiredCoupons: [
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
        usageAmount: 111
      }
    ],
  };

  constructor(
    private store: Store<fromMain.MainState>
  ) {}

  fetchConsolidatedData() {
    this.store.dispatch(new MainActions.FetchConsolidatedData(this.consolidatedData));
  }

  fetchStatisticByPeriod() {
    console.log('fetchStatisticByPeriod from Service');
    this.store.dispatch(new MainActions.FetchStatistic(this.statisticByPeriod));
  }

  fetchTransactionsByPeriod(query) {
    console.log('fetchTransactionsByPeriod from Service');
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
}
