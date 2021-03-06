export interface SiteTraffic {
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

export interface Statistic {
  date: Date;
  uniques: number;
  hits: number;
  inquiries: number;
  fakes: number;
  sales: number;
  salesIncome: number;
  rebills: number;
  rebillsIncome: number;
  incomeOn1k: number;
  salesOn1k: number;
  chargeback: number;
  refferers: number;
  refferersIncome: number;
  totalIncome: number;
}

export interface PixelTracking {
  date: Date;
  startedFillOrderForm: number;
  startedFillInquiryForm: number;
  orderCreated: number;
  inquiryCreated: number;
  orderPaid: number;
  userRegistered: number;
  onlineChat: number;
}

export interface Country {
  name: string;
  abbr: string;
  amount: number;
}

export interface OS {
  name: string;
  amount: number;
}

export interface Browser {
  name: string;
  amount: number;
}

export interface UTM {
  id: number;
  name: string;
}

export interface StatisticFilter {
  name: string;
  enabled: boolean;
}

export interface StatisticPanelFilter {
  name: string;
  filterList: StatisticFilter[];
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  date: Date;
  amount: number;
  type: string;
  method: string;
  status: string;
  details: string;
  comments: string;
}

export interface News {
  id: number;
  date: Date;
  title: string;
  excerpt: string;
  content: string;
}

export interface Discounts {
  visitorsLastMonth: number;
  uniquesLastMonth: number;
  isRequestSubmitted: boolean;
  availableCoupons: number;
  usedCoupons: number;
  sources: string[];
  activeCoupons: Coupon[];
  expiredCoupons: Coupon[];
  totalActiveCoupons: number;
  totalExpiredCoupons: number;
}

export interface Coupon {
  name: string;
  group: string;
  site: string;
  creationDate: Date;
  expirationDate: Date;
  discountValue: number;
  usageAmount: number;
}

export interface StatisticByDate {
  creationDate: Date;
  paymentDate: Date;
  clientId: number;
  country: string;
  status: string;
  orderId: number;
  subId: number;
  site: string;
  title: string;
  serviceType: string;
  orderAmount: number;
  ratio: number;
  orderIncome: number;
}

export interface PixelTrackingEvent {
  date: Date; // UTC timezone!
  site: string;
  responseStatus: number;
  messageStatus: string;
  eventDetails: string;
}

export interface RefPage {
  id: number;
  name: string;
}

export interface PTEventParamsData extends PTEventData {
  id: number; // pixel-tracking event id
  status: number; // pixel-tracking event status: 1 - enabled, 0 - disabled
  name: string; // pixel-tracking event name
}

export interface PTEventData {
  source: number; // pixel-tracking event source (backend | frontend)
  method: number; // pixel-tracking event method (post | get)
  params: string; // pixel-tracking event URL and additional params
}
