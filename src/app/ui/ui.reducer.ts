import {
  UIActions,
  IS_LOGIN_FORM_OPENED,
  IS_SIGNUP_FORM_OPENED,
  IS_MOBILE_MENU_OPENED,
  SET_LANG,
  SET_MEDIA_QUERY,
} from './ui.actions';

export interface State {
  isLoginFormOpened: boolean;
  isSignupFormOpened: boolean;
  isMobileMenuOpened: boolean;
  currentLanguage: string;
  activeMediaQuery: string;
}

export const initialState: State = {
  isLoginFormOpened: false,
  isSignupFormOpened: false,
  isMobileMenuOpened: false,
  currentLanguage: '',
  activeMediaQuery: '',
};

export function uiReducer(state: State = initialState, action: UIActions) {
  switch (action.type) {
    case IS_LOGIN_FORM_OPENED:
      return {
        ...state,
        isLoginFormOpened: action.payload,
      };
    case IS_SIGNUP_FORM_OPENED:
      return {
        ...state,
        isSignupFormOpened: action.payload,
      };
    case IS_MOBILE_MENU_OPENED:
      return {
        ...state,
        isMobileMenuOpened: action.payload
      };

    case SET_LANG:
      return {
        ...state,
        currentLanguage: action.payload
      };
    case SET_MEDIA_QUERY:
      return {
        ...state,
        activeMediaQuery: action.payload
      };
    default:
      return state;
  }
}

export const getIsLoginFormOpened = (state: State) => state.isLoginFormOpened;
export const getIsSignupFormOpened = (state: State) => state.isSignupFormOpened;
export const getIsMobileMenuOpened = (state: State) => state.isMobileMenuOpened;
export const getCurrentLanguage = (state: State) => state.currentLanguage;
export const getActiveMediaQuery = (state: State) => state.activeMediaQuery;

