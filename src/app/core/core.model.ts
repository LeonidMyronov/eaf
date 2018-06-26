export interface Site {
  id: number;
  name: string;
  iconSrc: string;
  fisrtOrderPercent?: number;
  rebillsPercent?: number;
  iconLightSrc: string;
  preview?: string;
  description?: string;
  isDesktopVersion?: boolean;
  isMobileVersion?: boolean;
}

export interface TimeList {
  id: number;
  name: string;
}

export interface NavMenuItem {
  name: string;
  url: string;
}

export interface UserMenuItem extends NavMenuItem {
  iconSrc: string;
}

export interface AuthMenuItem extends NavMenuItem {
  item_class: string;
  auth: boolean;
}

export interface LangListItem {
  name: string;
  abbr: string;
  img: string;
}
