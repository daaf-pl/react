import axios from 'axios';
import configParams from '../../application/config/constants';
import { setIsAuth/*, clearAuth*/ } from '../../application/actions/auth';
import _ from 'lodash';

const namespace = 'LOGIN_FORM';
// export const LOGIN_FORM = `LOGIN_FORM_${namespace}`;
// export const AUTH_ERROR = `AUTH_ERROR_${namespace}`;
export const SET_ERROR = `SET_ERROR_${namespace}`;
export const CLEAR_ERROR = `CLEAR_ERROR_${namespace}`;
export const CLEAR_IS_LOADING = `CLEAR_IS_LOADING_${namespace}`;
export const SHOW_IS_LOADING = `SHOW_IS_LOADING_${namespace}`;

export function clearIsLoading() {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({
        type: CLEAR_IS_LOADING,
        isLoading: false
      });
    }, 200);
  }
}

export function showIsLoading() {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({
        type: SHOW_IS_LOADING,
        isLoading: 'show'
      });
    }, 200);
  }
}

//For any field errors upon submission (i.e. not instant check)
export function loginFormAction(params) {
  // console.log(params);
  // const paramsy = { email: 'jaroslaw_debski@o2.pl', password: 'tajnehaslo' }
  return function (dispatch) {
    axios.post(`${configParams.API_URL}/auth/login`, params)
      // axios.post(`${configParams.API_URL}/auth/login`, paramsy)
      .then((response) => {
        if (_.get(response, 'data.success') === true) {
          localStorage.setItem('token', response.data.token);
          dispatch(setIsAuth(response));
        } else {
          dispatch({
            type: SET_ERROR,
            error: true,
          });
          // dispatch(clearAuth());
        }
      })
      .catch((error) => {
        // let errorMessage = error.response ? error.response.data : error;
        let errorMessage = error;
        // NOT AUTHENTICATED ERROR
        if (error.status === 401 || error.response.status === 401) {
          errorMessage = 'Podano nieprawidłowy adres email lub hasło.';
          // return dispatch(logoutUser(errorMessage));
        }

        dispatch({
          type: SET_ERROR,
          error: errorMessage,
        });
      });
  }
}