import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromLayout from './store/layout.reducer';


export interface State {
  auth: fromAuth.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  layout: fromLayout.layoutReducer
};


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);


export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getIsLoginFormOpened = createSelector(getLayoutState, fromLayout.getIsLoginFormOpened);
export const getIsSignupFormOpened = createSelector(getLayoutState, fromLayout.getIsSignupFormOpened);
