import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromUI from './ui/ui.reducer';
import * as fromUser from './secure-section/user/store/user.reducer';


export interface State {
  auth: fromAuth.State;
  ui: fromUI.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer,
  user: fromUser.userReducer,
};


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoginFormOpened = createSelector(getUIState, fromUI.getIsLoginFormOpened);
export const getIsSignupFormOpened = createSelector(getUIState, fromUI.getIsSignupFormOpened);

export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getShortUserState = createSelector(getUserState, fromUser.getShortUserState);
