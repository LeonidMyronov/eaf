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

  private ptEvents = [
    {
      id: 1,
      name: 'startedFillOrderForm'
    },
    {
      id: 2,
      name: 'startedFillInquiryForm'
    },
    {
      id: 3,
      name: 'orderCreated',
    },
    {
      id: 4,
      name: 'inquiryCreated',
    },
    {
      id: 5,
      name: 'orderPaid',
    },
    {
      id: 6,
      name: 'userRegistered',
    },
    {
      id: 7,
      name: 'onlineChat'
    }
  ];

  ptEventFormData = [
    {
      name: 'source',
      label: 'Send data from:',
      items: [
        {
          id: 1,
          name: 'Back-end'
        },
        {
          id: 2,
          name: 'Front-end'
        }
      ]
    },
    {
      name: 'method',
      label: 'Use method:',
      items: [
        {
          id: 1,
          name: 'Post'
        },
        {
          id: 2,
          name: 'Get'
        }
      ]
    }
  ];

  private postBackParams = [
    {param: 'tracking', name:  'Tracking'},
    {param: 'site', name:  'Site'},
    {param: 'event', name:  'Event name'},
    {param: 'rid', name:  'Webmaster\'s ID'},
    {param: 'sid', name:  'Sub ID'},
    {param: 'click_id', name:  'Click ID'},
    {param: 'user_id', name:  'User ID'},
    {param: 'user_geo', name:  'User\' Geo Location'},
    {param: 'user_device', name:  'User\s device'},
    {param: 'transaction_id', name:  'Transaction ID'},
    {param: 'date_added', name:  'Creation date'},
    {param: 'date_paid', name:  'Payment date'},
    {param: 'order_status', name:  'Order status'},
    {param: 'order_title', name:  'Order title'},
    {param: 'order_service', name:  'Type of service'},
    {param: 'order_discipline', name:  'Discipline'},
    {param: 'order_amount', name:  'Order amount'},
    {param: 'order_coeff', name:  'Earning coefficient'},
    {param: 'order_profit', name:  'Income amount'},
    {param: 'order_id', name:  'Order ID'},
  ];

  constructor() {}

  getPaymentMethods(): PaymentMethod[] {return [...this.paymentMethods]; }
  getSitesArr(): DiscountSite[] {return [...this.sitesArr]; }
  getRefPages(): RefPage[] {return [...this.REfPagesList]; }
  getPTEvents() {return [...this.ptEvents]; }
  getPTEventFormdata() {return [...this.ptEventFormData]; }
  getPostBackParams() {return [...this.postBackParams]; }
}
