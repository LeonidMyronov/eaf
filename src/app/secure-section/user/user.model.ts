import { StatisticPanelFilter } from '../store/main.model';

export interface User {
  email: string;
  id: number;
  name: string;
  icqAccount: number;
  skypeAccount: string;
  balance: number;
  statisticFiltersList: StatisticPanelFilterList;
}


export interface StatisticPanelFilterList {
  name: string;
  statisticFilters: StatisticPanelFilter[];
}
