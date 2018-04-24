import {
  UIActions,
  IS_LOGIN_FORM_OPENED,
  IS_SIGNUP_FORM_OPENED,
  IS_MOBILE_MENU_OPENED,
} from './ui.actions';

export interface State {
  isLoginFormOpened: boolean;
  isSignupFormOpened: boolean;
  isMobileMenuOpened: boolean;
}

export const initialState: State = {
  isLoginFormOpened: false,
  isSignupFormOpened: false,
  isMobileMenuOpened: false,
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
    default:
      return state;
  }
}

export const getIsLoginFormOpened = (state: State) => state.isLoginFormOpened;
export const getIsSignupFormOpened = (state: State) => state.isSignupFormOpened;
export const getIsMobileMenuOpened = (state: State) => state.isMobileMenuOpened;

