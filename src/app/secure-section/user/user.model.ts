import { StatisticPanelFilter } from '../store/main.model';

export interface User {
  readonly id: number;
  name: string;
  surname: string;
  email: string;
  icqAccount: number;
  skypeAccount: string;
  jabberAccount: string;
  info: string;
  registrationDate: Date;
  lastVisit: Date;
  balance: number;
  totalIncome: number;
  nextWithdrawDate: number;
  statisticFiltersList: StatisticPanelFilterList;
  prefferedPaymentMethod: number; // payment ID
  paymentNotes: string;
}


export interface StatisticPanelFilterList {
  name: string;
  statisticFilters: StatisticPanelFilter[];
}

