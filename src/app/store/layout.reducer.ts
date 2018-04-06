import { LayoutActions, IS_LOGIN_FORM_OPENED, IS_SIGNUP_FORM_OPENED } from './layout.actions';

export interface State {
  isLoginFormOpened: boolean;
  isSignupFormOpened: boolean;
}

export const initialState: State = {
  isLoginFormOpened: false,
  isSignupFormOpened: false,
};

export function layoutReducer(state: State = initialState, action: LayoutActions) {
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
    default:
    return state;
  }
}

export const getIsLoginFormOpened = (state: State) => state.isLoginFormOpened;
export const getIsSignupFormOpened = (state: State) => state.isSignupFormOpened;

