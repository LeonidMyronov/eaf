import { User } from '../user.model';
import { UserActions,
  FILL_PROFILE,
  CLEAR_PROFILE,
  ADD_FILTERS_LIST,
  ENABLE_PIXEL_TRACKING,
  SET_PIXEL_TRACKING_EVENT_PARAMS,
  ACTIVATE_PIXEL_TRACKING
} from './user.actions';
import { Site, WhiteLabel } from '../../../core/core.model';


export interface State {
  user: User;
  sites: Site[];
  wl: WhiteLabel[];
}

const initialState: State = {
  user: {
    email: null,
    id: null,
    name: null,
    icqAccount: null,
    skypeAccount: null,
    balance: null,
    nextWithdrawDate: null,
    statisticFiltersList: null,
    registrationDate: null,
    lastVisit: null,
    surname: '',
    jabberAccount: '',
    info: '',
    prefferedPaymentMethod: null,
    paymentNotes: '',
    totalIncome: null,
  },
  sites: [],
  wl: []
};

export function userReducer(state: State = initialState, action: UserActions) {
  switch (action.type) {
    case FILL_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        ...initialState
      };
    case ADD_FILTERS_LIST:
    return {
      ...state,
      user: {
        ...state.user,
        statisticFiltersList: action.payload
      }
    };
    case ENABLE_PIXEL_TRACKING:
    return {
      ...state,
      sites: state.sites.map(s => {
        if (s.id !== action.payload) {
          return s;
        } else {
          return {
            ...s,
            pixelTrackingEnabled: true,
            pixelTrackingActivated: true
          };
        }
      })
    };
    case ACTIVATE_PIXEL_TRACKING:
    return {
      ...state,
      sites: state.sites.map(s => {
        if (s.id !== action.payload.id) {
          return s;
        } else {
          return {
            ...s,
            pixelTrackingActivated: action.payload.status
          };
        }
      }),
      wl: state.wl.map(s => {
        if (s.id !== action.payload.id) {
          return s;
        } else {
          return {
            ...s,
            pixelTrackingActivated: action.payload.status
          };
        }
      })
    };

    case SET_PIXEL_TRACKING_EVENT_PARAMS:
    return {
      ...state,
      sites: state.sites.map(s => {
        if (s.id !== action.payload.id) {
          return s;
        } else {
          return {
            ...s,
            ptEventParamsData: action.payload.ptEventParamsData,
            // pixelTrackingActivated: true,
          };
        }
      })
    };
    default:
      return state;
  }
}

export const getShortUserState = (state: State): Partial<User>  => {
  return {
    id: state.user.id,
    email: state.user.email,
    name: state.user.name,
    balance: state.user.balance
  };
};

export const getUserBalanceState = (state: State) => {
  return {
    balance: state.user.balance,
    nextWithdrawDate: state.user.nextWithdrawDate
  };
};

export const getUserStatisticFilters = (state: State) => state.user.statisticFiltersList;
export const getAllSites = (state: State) => state.sites;
export const getOurSites = (state: State) => state.sites.slice(1);
export const getWLs = (state: State) => state.wl;
export const getAllUserSites = (state: State) => {
  return [...state.sites.slice(1), ...state.wl];
};

