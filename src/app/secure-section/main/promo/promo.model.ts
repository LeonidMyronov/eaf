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
}
