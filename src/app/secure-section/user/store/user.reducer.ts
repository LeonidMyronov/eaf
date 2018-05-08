import { User } from '../user.model';
import { UserActions, FILL_PROFILE, CLEAR_PROFILE, ADD_FILTERS_LIST } from './user.actions';


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
    statisticFiltersList: null,
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
          statisticFiltersList: null
        }
      };
    case ADD_FILTERS_LIST:
    return {
      ...state,
      user: {
        email: null,
        id: null,
        name: null,
        icqAccount: null,
        skypeAccount: null,
        balance: null,
        statisticFiltersList: action.payload
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

export const getStatisticFilters = (state: State) => state.user.statisticFiltersList;

