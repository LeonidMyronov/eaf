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
  date: Date;
  site: string;
  responseStatus: string;
  messageStatus: string;
  eventDetails: string;
}
