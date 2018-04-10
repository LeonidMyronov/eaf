import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromUI from './store/ui.reducer';


export interface State {
  auth: fromAuth.State;
  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer
};


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);


export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoginFormOpened = createSelector(getUIState, fromUI.getIsLoginFormOpened);
export const getIsSignupFormOpened = createSelector(getUIState, fromUI.getIsSignupFormOpened);
