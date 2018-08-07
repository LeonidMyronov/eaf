export interface SignupData {
  email: string;
  password1: string;
  password2: string;
  userName?: string; // optional - full user name
  icqAccount?: number;  // optional - ICQ account
  skypeAccount?: string; // optional  - Skype account
  promoCode?: string; // optional promo key
}

