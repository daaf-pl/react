import { IS_AUTH } from '../actions/auth';

const INITIAL_STATE = {
  userInfo: null,
  isAuth: false
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        userInfo: action.userInfo,
        isAuth: action.isAuth
      };
    default:
      return state;
  }
}