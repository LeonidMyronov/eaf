import { Injectable } from '@angular/core';

import { NavItem } from '../promo.model';

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

  constructor() { }

  get _navMenu(): NavItem[] {
    return [...this.navMenu];
  }
}
