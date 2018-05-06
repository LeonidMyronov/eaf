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
    news: [
      {
        date: new Date(),
        title: 'Новые условия по рефералке',
        content: `Добрый день! Сезон идет во всю, поэтому напоминанию о нашей реферальной программе,
          т.к. это источник постоянного пассивного дохода!`
      }
    ],
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
      {time: new Date(2018, 4, 30, 16), value: -1},
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
        amount: 187,
        abbr: 'au'
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
       filterList: [{name: 'DSC001', enabled: true}, {name: 'DSC002', enabled: true}, {name: 'DSC003', enabled: true}]
      },
      {name: 'subid',
      filterList: [{name: '1001', enabled: true}, {name: '1002', enabled: true}, {name: '1003', enabled: true}]
      },
      {name: 'deviceTypes',
      filterList: [{name: 'desktop', enabled: true}, {name: 'tablet', enabled: true}, {name: 'mobile', enabled: true}, {name: 'other', enabled: false}]
      },
      {name: 'os',
      filterList: [{name: 'windows', enabled: true}, {name: 'osx', enabled: true}, {name: 'linux', enabled: true}, {name: 'android', enabled: true}, {name: 'iOS', enabled: true}]
      },
      {name: 'browsers', filterList: [{name: 'Chrome', enabled: true}, {name: 'FireFox', enabled: true}, {name: 'Safari', enabled: true}, {name: 'Edge', enabled: true}, {name: 'IE',  enabled: true}]
      },
      {name: 'countries',
      filterList: [
        {name: 'United Kingdom', amount: 323,
          enabled: true, abbr: 'gb'},
        {name: 'Spain', amount: 256,
        enabled: true, abbr: 'es'},
        {name: 'Germany', amount: 209,
        enabled: true, abbr: 'de'},
        {name: 'Australia', amount: 187,
        enabled: true, abbr: 'au' }
      ]}
    ]
  };

  constructor(
    private store: Store<fromMain.MainState>
  ) {}

  fetchConsolidatedData() {
    this.store.dispatch(new MainActions.FetchConsolidatedData(this.consolidatedData));
  }

  fetchStatisticByPeriod() {
    this.store.dispatch(new MainActions.FetchStatistic(this.statisticByPeriod));
  }

}
