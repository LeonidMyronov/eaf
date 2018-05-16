import { Injectable } from '@angular/core';
import { PaymentMethod } from '../store/main.model';

@Injectable()
export class MainStorageService {
  private paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: 'Pay Pal'
    },
    {
      id: 2,
      name: 'WebMonye'
    }
  ];
  constructor() {}

  getPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods;
  }
}
