export interface SiteTraffic {
  name: string;
  amount: number;
}

export interface GeoTarget {
  name: string;
  amount: number;
  abbr: string;
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
