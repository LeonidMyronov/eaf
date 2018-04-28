export interface User {
  email: string;
  id: number;
  name: string;
  icqAccount: number;
  skypeAccount: string;
  balance: number;
  totalIncomeAmount: number;
  rebillsAmount: number;
  sellsAmount: number;
  uniqueVisitorsAmount: number;
  sources: string[];
  sitesTraffic: SiteTraffic[];
  geoTargets: GeoTarget[];
  deviceTypes: DeviceType[];
  news: any[];
  lastDayIncomes: Income[];
}

export interface SiteTraffic {
  name: string;
  amount: number;
}

export interface GeoTarget {
  name: string;
  amount: number;
}

export interface DeviceType {
  name: string;
  amount: number;
}

export interface Income {
  time: string;
  value: number;
}
