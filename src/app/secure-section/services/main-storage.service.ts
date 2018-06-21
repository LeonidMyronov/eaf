import { Injectable } from '@angular/core';
import { PaymentMethod, RefPage } from '../store/main.model';

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


  constructor() {}

  getPaymentMethods(): PaymentMethod[] {return [...this.paymentMethods]; }
  getSitesArr(): DiscountSite[] {return [...this.sitesArr]; }
  getRefPages(): RefPage[] {return [...this.REfPagesList]; }
}
