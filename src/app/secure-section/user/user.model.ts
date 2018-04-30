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
  lastDayConversions: Conversion[];
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
  time: Date;
  value: number;
}

export interface Conversion {
  date: Date;
  site: string;
  orderId: number;
  amount: number;
}
