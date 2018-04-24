import { Action } from '@ngrx/store';
import { AuthActions, IS_AUTH, IS_UNAUTH } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: true,
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case IS_AUTH:
    return {
      ...state,
      isAuthenticated: true
    };
    case IS_UNAUTH:
    return {
      ...state,
      isAuthenticated: false
    };
    default:
    return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
