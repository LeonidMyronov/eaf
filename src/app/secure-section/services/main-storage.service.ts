import { Injectable } from '@angular/core';
import { PaymentMethod, RefPage, PromoCalcView, PromoCalcColorScheme } from '../store/main.model';

export interface DiscountSite {
  id: number;
  name: string;
  logo: string;
}

@Injectable()
export class MainStorageService {
  private paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: 'Pay Pal'
    },
    {
      id: 2,
      name: 'Epase'
    },
    {
      id: 3,
      name: 'WebMonye'
    },
    {
      id: 4,
      name: 'Cash'
    }
  ];

  private sitesArr = [
    {
      id: 1,
      name: '99papers.com',
      logo: '/assets/images/main/discount/99papers-logo.svg'
    },
    {
      id: 2,
      name: 'Essay.com',
      logo: '/assets/images/main/discount/essay-logo.svg'
    },
    {
      id: 3,
      name: 'WhiteLabel.com',
      logo: '/assets/images/main/discount/whitelabel-logo.svg'
    },
    {
      id: 4,
      name: 'hws.com',
      logo: '/assets/images/main/discount/hws-logo.svg'
    },
  ];

  private REfPagesList: RefPage[] = [
    {
      id: 1,
      name: 'Main page'
    },
    {
      id: 1,
      name: 'How it works'
    },
    {
      id: 1,
      name: 'Pricing'
    },
    {
      id: 1,
      name: 'Samples'
    }
  ];

  private promoCalcViews: PromoCalcView[] = [
    {
      id: 1,
      name: 'Small',
      size: '260x414 px',
      imageSrc: '/assets/images/promo/calc/calc-small.svg'
    },
    {
      id: 2,
      name: 'Horizontal',
      size: '900x205 px',
      imageSrc: '/assets/images/promo/calc/calc-hor.svg'
    },
    {
      id: 3,
      name: 'Big',
      size: '540x741 px',
      imageSrc: '/assets/images/promo/calc/calc-big.svg'
    },
    {
      id: 4,
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

  constructor() {}

  getPaymentMethods(): PaymentMethod[] {return [...this.paymentMethods]; }
  getSitesArr(): DiscountSite[] {return [...this.sitesArr]; }
  getRefPages(): RefPage[] {return [...this.REfPagesList]; }
  getPromoCalcViews(): PromoCalcView[] {return [...this.promoCalcViews]; }
  getPromoCalcColorSchemes(): PromoCalcColorScheme[] {return [...this.promoCalcColorSchemes]; }
}
