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
