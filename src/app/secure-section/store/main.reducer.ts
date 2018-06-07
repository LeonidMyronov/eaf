import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../app.reducers';
import {
  SiteTraffic,
  DeviceType,
  Income,
  Conversion,
  Statistic,
  Country,
  PixelTracking,
  OS,
  Browser,
  StatisticPanelFilter,
  Transaction,
  News,
  Discounts,
  StatisticByDate,
  PixelTrackingEvent,
  Coupon
} from './main.model';
import {
  MainActions,
  FETCH_CONSOLIDATED_DATA,
  FETCH_STATISTIC,
  UPDATE_STATISTIC_FILTERS,
  SAVE_STATISTIC_FILTERS,
  STATISTIC_QUERY_PARAMS,
  FETCH_TRANSACTIONS,
  FETCH_NEWS,
  FETCH_DISCOUNT_INTRO,
  SUBMIT_DISCOUNT_REQUEST,
  FETCH_DISCOUNT_DETAILS,
  FETCH_DAY_STAT,
  FILL_PT_EVENTS_NAMES,
  FETCH_PT_EVENTS_DETAILS,
  SET_PROMO_SITE_DATA,
  STORE_PROMO_DATA,
  UPDATE_PROMO_SBANNER_COUPON,
  UPDATE_PROMO_SBANNER_UTM,
  UPDATE_PROMO_ABANNER_COUPON,
  UPDATE_PROMO_ABANNER_UTM
} from './main.actions';
import { Site } from '../../core/core.model';
import { Banner, PromoTheme } from '../main/promo/promo.model';

export interface MainState {
  totalIncomeAmount: number;
  rebillsAmount: number;
  sellsAmount: number;
  uniqueVisitorsAmount: number;
  sources: string[];
  sitesTraffic: SiteTraffic[];
  geoTargets: Country[];
  deviceTypes: DeviceType[];
  lastNews: News;
  lastDayIncomes: Income[];
  lastDayConversions: Conversion[];
  statistic: {
    statistic: Statistic[],
    conversions: Conversion[],
    incomes: Income[],
    pixelTracking: PixelTracking[],
    countries: Country[],
    deviceTypes: DeviceType[],
    os: OS[],
    browsers: Browser[],
    filters: StatisticPanelFilter[],
  };
  statisticQueryParams: {
    fromDate: Date;
    toDate: Date;
    site: SiteTraffic;
  };
  transactions: Transaction[];
  news: {
    more: boolean;
    lastFetched: number;
    news: News[];
  };
  discounts: Discounts;
  statisticByDate: {
    date: Date;
    totalIncome: number;
    data: StatisticByDate[]
  };
  pixelTracking: {
    eventsNamesList: string[],
    eventsDetailsList: PixelTrackingEvent[]
  };
  promo: {
    site: Site;
    refLink: string;
    coupons: Coupon[];
    staticBanners: Banner[];
    animatedBanners: Banner[];
    wpThemes: PromoTheme[];
    landingThemes: PromoTheme[];
  };
}


export interface State extends fromRoot.State {
  main: MainState;
}

export const initialState: MainState = {
  totalIncomeAmount: null,
  rebillsAmount: null,
  sellsAmount: null,
  uniqueVisitorsAmount: null,
  sources: [],
  sitesTraffic: [],
  geoTargets: [],
  deviceTypes: [],
  lastNews: null,
  lastDayIncomes: [],
  lastDayConversions: [],
  // statistic: {
  //   statistic: [],
  //   conversions: [],
  //   incomes: [],
  //   pixelTracking: [],
  //   countries: [],
  //   deviceTypes: [],
  //   os: [],
  //   browsers: [],
  //   filters: [],
  // },
  statistic: null,
  statisticQueryParams: null,
  transactions: [],
  news: {
    more: false,
    lastFetched: null,
    news: [],
  },
  discounts: {
    visitorsLastMonth: null,
    uniquesLastMonth: null,
    isRequestSubmitted: false,
    availableCoupons: null,
    usedCoupons: null,
    sources: [],
    activeCoupons: [],
    expiredCoupons: [],
    totalActiveCoupons: null,
    totalExpiredCoupons: null,
  },
  statisticByDate: {
    date: null,
    totalIncome: null,
    data: []
  },
  pixelTracking: {
    eventsNamesList: [],
    eventsDetailsList: []
  },
  promo: {
    site: {
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
    refLink: 'https://99papers.com/?ref_id=145',
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
        bannerSrc: '/assets/images/promo/sbanners/banner2.svg'
      },
      {
        id: 3,
        title: 'The Best Essay Writing Service',
        size: '300x600 px',
        category: 'Animated баннер',
        bannerSrc: '/assets/images/promo/sbanners/banner3.svg'
      }
    ],
    wpThemes: [
      {
        id: 1,
        name: 'WP Theme v01',
        preview: '/assets/images/header/sites/preview-essaybox.org.svg',
        instructions: `<ol>
          <li>Скачайте файл: <a href="https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip">wp_theme_99papers-master.zip</a></li>
          <li>Поместите тему в <span class="accent-color">wp-content/themes/</span> и активируйте, используя админ панель WordPress</li>
          <li>Добавьте .htaccess файл при необходимости.</li>
          <li>Отредактируйте 3 строку в <span class="accent-color">wp-content/themes/&lt;theme_name&gt;/header.php</span> поместив ваш ref_id</li>
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
        instructions: `<ol>
        <li>Скачайте файл: <a href="https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip">wp_theme_99papers-master.zip</a></li>
        <li>Поместите тему в <span class="accent-color">wp-content/themes/</span> и активируйте, используя админ панель WordPress</li>
        <li>Добавьте .htaccess файл при необходимости.</li>
        <li>Отредактируйте 3 строку в <span class="accent-color">wp-content/themes/&lt;theme_name&gt;/header.php</span> поместив ваш ref_id</li>
      </ol>`,
        downloadLink: 'https://github.com/edu-affiliates/wp_theme_99papers/archive/master.zip',
        demoLink: 'https://edu-affiliates.com/ru/promo/site/4/'
      }
    ],
  }
};


export function mainReducer(state: MainState = initialState, action: MainActions) {
  switch (action.type) {
    case FETCH_CONSOLIDATED_DATA:
      return {
        ...state,
        totalIncomeAmount: action.payload.totalIncomeAmount,
        rebillsAmount: action.payload.rebillsAmount,
        sellsAmount: action.payload.sellsAmount,
        uniqueVisitorsAmount: action.payload.uniqueVisitorsAmount,
        sources: action.payload.sources,
        sitesTraffic: action.payload.sitesTraffic,
        geoTargets: action.payload.geoTargets,
        deviceTypes: action.payload.deviceTypes,
        lastNews: action.payload.lastNews,
        lastDayIncomes: action.payload.lastDayIncomes,
        lastDayConversions: action.payload.lastDayConversions,
      };
    case FETCH_STATISTIC:
      return {
        ...state,
        statistic: action.payload
      };
    case UPDATE_STATISTIC_FILTERS:
      return {
        ...state,
        statistic: {
          ...state.statistic,
          filters: state.statistic.filters.map(f => {
            if (f.name !== action.payload.name) {
              return f;
            }
            f.filterList.forEach(fList => {
              if (fList.name === action.payload.filterList[0].name) {
                fList.enabled = action.payload.filterList[0].enabled;
              }
            });
            return {
              name: f.name,
              filterList: f.filterList
            };
          })
        }
      };
    case SAVE_STATISTIC_FILTERS:
      return {
        ...state,
        statistic: {
          ...state.statistic,
          filters: state.statistic.filters.map(f => {
            const income_f = action.payload.find(el => f.name === el.name);
            if (income_f) {
              return {
                name: f.name,
                filterList: f.filterList.map(fList => {
                  const income_fList = income_f.filterList.find(i_el => fList.name === i_el.name);
                  if (income_fList) {
                    return {
                      name: fList.name,
                      enabled: income_fList.enabled
                    };
                  } else {
                    return fList;
                  }
                })
              };
            } else {
              return f;
            }
          })
        }
      };
    case STATISTIC_QUERY_PARAMS:
      return {
        ...state,
        statisticQueryParams: action.payload
      };
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case FETCH_NEWS:
      return {
        ...state,
        news: {
          news: [...state.news.news, ...action.payload.news],
          more: action.payload.more,
          lastFetched: action.payload.lastFetched
        }
      };
    case FETCH_DISCOUNT_INTRO:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          uniquesLastMonth: action.payload.uniquesLastMonth,
          visitorsLastMonth: action.payload.visitorsLastMonth
        }
      };
    case FETCH_DISCOUNT_DETAILS:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          ...action.payload
        }
      };
    case SUBMIT_DISCOUNT_REQUEST:
      return {
        ...state,
        discounts: {
          ...state.discounts,
          isRequestSubmitted: true
        }
      };
    case FETCH_DAY_STAT:
      return {
        ...state,
        statisticByDate: action.payload
      };

    case FILL_PT_EVENTS_NAMES:
      return {
        ...state,
        pixelTracking: {
          ...state.pixelTracking,
          eventsNamesList: action.payload
        }
      };
    case FETCH_PT_EVENTS_DETAILS:
      return {
        ...state,
        pixelTracking: {
          ...state.pixelTracking,
          eventsDetailsList: action.payload
        }
      };
    case SET_PROMO_SITE_DATA:
      return {
        ...state,
        promo: {
          ...state.promo,
          site: action.payload.site,
          refLink: action.payload.refLink
        }
      };
    case STORE_PROMO_DATA:
      return {
        ...state,
        promo: {
          ...state.promo,
          ...action.payload
        }
      };
    case UPDATE_PROMO_SBANNER_COUPON:
      return {
        ...state,
        promo: {
          ...state.promo,
          staticBanners: state.promo.staticBanners.map(b => {
            if (b.id !== action.payload.id) {
              return b;
            }
            return {
              ...b,
              coupon: action.payload.coupon
            };
          })
        }
      };
    case UPDATE_PROMO_SBANNER_UTM:
      return {
        ...state,
        promo: {
          ...state.promo,
          staticBanners: state.promo.staticBanners.map(b => {
            if (b.id !== action.payload.id) {
              return b;
            }
            return {
              ...b,
              utm: action.payload.utm
            };
          })
        }
      };
    case UPDATE_PROMO_ABANNER_COUPON:
      return {
        ...state,
        promo: {
          ...state.promo,
          animatedBanners: state.promo.animatedBanners.map(b => {
            if (b.id !== action.payload.id) {
              return b;
            }
            return {
              ...b,
              coupon: action.payload.coupon
            };
          })
        }
      };
    case UPDATE_PROMO_ABANNER_UTM:
      return {
        ...state,
        promo: {
          ...state.promo,
          animatedBanners: state.promo.animatedBanners.map(b => {
            if (b.id !== action.payload.id) {
              return b;
            }
            return {
              ...b,
              utm: action.payload.utm
            };
          })
        }
      };
    default:
      return state;
  }
}

export const getMainState = createFeatureSelector<MainState>('main');

export const getConsolidatedData = createSelector(getMainState, (state: MainState) => {
  return {
    totalIncomeAmount: state.totalIncomeAmount,
    rebillsAmount: state.rebillsAmount,
    sellsAmount: state.sellsAmount,
    uniqueVisitorsAmount: state.uniqueVisitorsAmount,
    sources: state.sources,
    sitesTraffic: state.sitesTraffic,
    geoTargets: state.geoTargets,
    deviceTypes: state.deviceTypes,
    lastNews: state.lastNews,
    lastDayIncomes: state.lastDayIncomes,
    lastDayConversions: state.lastDayConversions,
  };
});

export const getStatistic = createSelector(getMainState, (state: MainState) => state.statistic);
export const getStatisticQueryParams = createSelector(getMainState, (state: MainState) => state.statisticQueryParams);
export const getTransactions = createSelector(getMainState, (state: MainState) => state.transactions);
export const getNews = createSelector(getMainState, (state: MainState) => state.news);
export const getDiscounts = createSelector(getMainState, (state: MainState) => state.discounts);
export const getStatisticByDate = createSelector(getMainState, (state: MainState) => state.statisticByDate);
export const getPTEventsNames = createSelector(getMainState, (state: MainState) => state.pixelTracking.eventsNamesList);
export const getPTEventsDetails = createSelector(getMainState, (state: MainState) => state.pixelTracking.eventsDetailsList);
export const getPromoSiteData = createSelector(getMainState, (state: MainState) => {
  return {
    site: state.promo.site,
    refLink: state.promo.refLink
  };
});
export const getPromoStatic = createSelector(getMainState, (state: MainState) => {
  return {
    siteName: state.promo.site.name,
    refLink: state.promo.refLink,
    banners: state.promo.staticBanners,
    coupons: state.promo.coupons
  };
});
export const getPromoAnimated = createSelector(getMainState, (state: MainState) => {
  return {
    siteName: state.promo.site.name,
    refLink: state.promo.refLink,
    banners: state.promo.animatedBanners,
    coupons: state.promo.coupons
  };
});
export const getPromoWP = createSelector(getMainState, (state: MainState) => {
  return {
    themes: state.promo.wpThemes
  };
});
export const getPromoLandings = createSelector(getMainState, (state: MainState) => {
  return {
    themes: state.promo.landingThemes
  };
});

