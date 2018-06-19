import { Injectable } from '@angular/core';

import { NavItem, PromoCalcView, PromoCalcColorScheme } from '../promo.model';

@Injectable()
export class PromoStorageService {
  private navMenu: NavItem[] = [
    {
      name: 'Static',
      iconSrc: '/assets/images/promo/header/static-icon.svg',
      url: 'static'
    },
    {
      name: 'GIF',
      iconSrc: '/assets/images/promo/header/gif-icon.svg',
      url: 'gif'
    },
    {
      name: 'WP Theme',
      iconSrc: '/assets/images/promo/header/wp-icon.svg',
      url: 'wp'
    },
    {
      name: 'Landing',
      iconSrc: '/assets/images/promo/header/landing-icon.svg',
      url: 'landing'
    },
    {
      name: 'Calculator',
      iconSrc: '/assets/images/promo/header/calc-icon.svg',
      url: 'calculator'
    },
    {
      name: 'Discounts',
      iconSrc: '/assets/images/promo/header/discount-icon.svg',
      url: 'discounts'
    },
  ];

  private promoCalcViews: PromoCalcView[] = [
    {
      id: 1,
      calcClass: 'calc-sm',
      name: 'Small',
      size: '260x414 px',
      imageSrc: '/assets/images/promo/calc/calc-small.svg'
    },
    {
      id: 2,
      calcClass: 'calc-sm',
      name: 'Horizontal',
      size: '900x205 px',
      imageSrc: '/assets/images/promo/calc/calc-hor.svg'
    },
    {
      id: 3,
      name: 'Big',
      calcClass: 'calc-lg',
      size: '540x741 px',
      imageSrc: '/assets/images/promo/calc/calc-big.svg'
    },
    {
      id: 4,
      calcClass: 'table-price',
      name: 'Table',
      size: '790x531 px',
      imageSrc: '/assets/images/promo/calc/calc-table.svg'
    },
  ];

  private promoCalcColorSchemes: PromoCalcColorScheme[] = [
    {
      id: 1,
      name: 'Variant 1',
      colors: [
        {
          name: 'bgColor',
          color: '#21414A'
        },
        {
          name: 'selectionBgColor',
          color: '#3DDFFF'
        },
        {
          name: 'selectionColor',
          color: '#FBE23F'
        },
        {
          name: 'textColor',
          color: '#FFFFFF'
        },
        {
          name: 'accentColor',
          color: '#EA6E0D'
        }
      ]
    },
    {
      id: 2,
      name: 'Variant 2',
      colors: [
        {
          name: 'bgColor',
          color: '#002F5D'
        },
        {
          name: 'selectionBgColor',
          color: '#A1D5FF'
        },
        {
          name: 'selectionColor',
          color: '#0078A7'
        },
        {
          name: 'textColor',
          color: '#FFFFFF'
        },
        {
          name: 'accentColor',
          color: '#FF5158'
        }
      ]
    },
    {
      id: 3,
      name: 'Variant 3',
      colors: [
        {
          name: 'bgColor',
          color: '#FFFFFF'
        },
        {
          name: 'selectionBgColor',
          color: '#05C7FE'
        },
        {
          name: 'selectionColor',
          color: '#FE4F56'
        },
        {
          name: 'textColor',
          color: '#1F1F20'
        },
        {
          name: 'accentColor',
          color: '#157995'
        }
      ]
    },
    {
      id: 4,
      name: 'Variant 4',
      colors: [
        {
          name: 'bgColor',
          color: '#F5A623'
        },
        {
          name: 'selectionBgColor',
          color: '#05C7FE'
        },
        {
          name: 'selectionColor',
          color: '#FFFFFF'
        },
        {
          name: 'textColor',
          color: '#1F1F20'
        },
        {
          name: 'accentColor',
          color: '#FE4F56'
        }
      ]
    }
  ];


  constructor() { }

  get _navMenu(): NavItem[] {
    return [...this.navMenu];
  }
  getPromoCalcViews(): PromoCalcView[] {return [...this.promoCalcViews]; }
  getPromoCalcColorSchemes(): PromoCalcColorScheme[] {return [...this.promoCalcColorSchemes]; }
}
