import { User } from '../user.model';
import { UserActions, FILL_PROFILE, CLEAR_PROFILE } from './user.actions';


export interface State {
  user: User;
}

const initialState: State = {
  user: {
    email: null,
    id: null,
    name: null,
    icqAccount: null,
    skypeAccount: null,
    balance: null,
    totalIncomeAmount: null,
    rebillsAmount: null,
    sellsAmount: null,
    uniqueVisitorsAmount: null,
    sources: [],
    sitesTraffic: [],
    geoTargets: [],
    deviceTypes: [],
    news: [],
    lastDayIncomes: [],
  },
};

export function userReducer(state: State = initialState, action: UserActions) {
  switch (action.type) {
    case FILL_PROFILE:
      return {
        ...state,
        user: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        user: {
          email: null,
          id: null,
          name: null,
          icqAccount: null,
          skypeAccount: null,
          balance: null,
          totalIncomeAmount: null,
          rebillsAmount: null,
          sellsAmount: null,
          uniqueVisitorsAmount: null,
          sources: [],
          sitesTraffic: [],
          geoTargets: [],
          deviceTypes: [],
          news: [],
          lastDayIncomes: [],
        }
      };
    default:
      return state;
  }
}

export const getShortUserState = (state: State) => {
  return {
    id: state.user.id,
    email: state.user.email,
    name: state.user.name,
    balance: state.user.balance
  };
};

