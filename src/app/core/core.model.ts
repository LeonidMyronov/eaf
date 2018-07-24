import { PTEventParamsData } from '../secure-section/store/main.model';

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
  pixelTrackingEnabled?: boolean; // is pixel-tracking added for this site
  pixelTrackingActivated?: boolean; // is post-back activated or not for this site
  ptEventParamsData?: PTEventParamsData[]; // pixel-tracking params for event
  trackedEventsCount?: number; // postBack section: amount of events are tracked for Site
  lastWeekEventsCount?: number; // postBack prop: amount of events were triggered for the last week
}

export interface WhiteLabel extends Site {
  stat: WhiteLabelStat;
}

export interface WhiteLabelStat {
  income: number;
  sales: number;
  uniques: number;
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
