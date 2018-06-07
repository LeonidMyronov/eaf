import { Coupon } from '../../store/main.model';

export interface NavItem {
  name: string;
  iconSrc: string;
  url: string;
}

export interface Banner {
  id: number;
  title: string;
  size: string;
  category: string;
  bannerSrc: string;
  utm?: string;
  coupon?: Coupon;
}

export interface PromoTheme {
  id: number;
  name: string;
  preview: string;
  instructions: string;
  downloadLink: string;
  demoLink: string;
}
