import axios from 'axios';
import { errorHandler } from './errorHandler';
import configParams from '../config/constants';
import _ from 'lodash';

const namespace = 'AUTH_ACTION';
export const IS_AUTH = `IS_AUTH_${namespace}`;
export const STATIC_IS_AUTH_ERROR = `STATIC_IS_AUTH_ERROR_${namespace}`;
export const CLEAR_AUTH = `CLEAR_AUTH_${namespace}`;

export function checkIsAuth(token) {

  axios.defaults.headers.common['Authorization'] = token;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  return function (dispatch) {
    axios.get(`${configParams.API_URL}/checkAuth`)
      .then((response) => {
        if (_.get(response, 'data.success') === true) {
          dispatch(setIsAuth(response));
        } else {
          dispatch(clearAuth());
        }
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, STATIC_IS_AUTH_ERROR);
      });
  }

};

export function setIsAuth(response) {
  return function (dispatch) {
    // console.log(response.data);
    dispatch({
      type: IS_AUTH,
      isAuth: _.get(response, 'data.success', false),
      userInfo: _.get(response, 'data', false),
    });
  }
}

export function clearAuth() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_AUTH
    });
    // localStorage.removeItem('token');
  }
}

// import { browserHistory } from 'react-router';
// import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';

// export function loginUser({ email, password }) {
//   return function (dispatch) {
//     axios.post(`${configParams.API_URL}/auth/login`, { email, password })
//     .then((response) => {
//       dispatch({ type: AUTH_USER });
//       window.location.href = `${configParams.CLIENT_URL}/dashboard`;
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR);
//     });
//   };
// }

// export function registerUser({ email, firstName, lastName, password }) {
//   return function (dispatch) {
//     axios.post(`${configParams.API_URL}/user/user`, { email, firstName, lastName, password })
//     .then((response) => {
//       dispatch({ type: AUTH_USER });
//       window.location.href = `${configParams.CLIENT_URL}/dashboard`;
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR);
//     });
//   };
// }

// export function logoutUser(error) {
//   return function (dispatch) {
//     dispatch({ type: UNAUTH_USER, payload: error || '' });

//     window.location.href = `${configParams.CLIENT_URL}/login`;
//   };
// }

// export function getForgotPasswordToken({ email }) {
//   return function (dispatch) {
//     axios.post(`${configParams.API_URL}/auth/forgot-password`, { email })
//     .then((response) => {
//       dispatch({
//         type: FORGOT_PASSWORD_REQUEST,
//         payload: response.data.message,
//       });
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR);
//     });
//   };
// }

// export function resetPassword(token, { password }) {
//   return function (dispatch) {
//     axios.post(`${configParams.API_URL}/auth/reset-password/${token}`, { password })
//     .then((response) => {
//       dispatch({
//         type: RESET_PASSWORD_REQUEST,
//         payload: response.data.message,
//       });
//       // Redirect to login page on successful password reset
//       browserHistory.push('/login');
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR);
//     });
//   };
// }
