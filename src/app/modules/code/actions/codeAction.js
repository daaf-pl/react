import axios from 'axios';
import configParams from '../../application/config/constants';

const namespace = 'FETCH_CODE';
export const FETCH_CODE = `FETCH_CODE_${namespace}`;
export const CLEAR_CODE = `CLEAR_CODE_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_CODE = `STATIC_ERROR_CODE_${namespace}`;

export function fetchCode(uid) {
    return function (dispatch) {
        dispatch(isLoading(true));
        axios.get(`${configParams.API_URL}/codes/codes/${uid}`)
            .then((response) => {
                dispatch({
                    type: FETCH_CODE,
                    payload: response.data.documents,
                    code: response.data.documents,
                });
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 100);
            }).catch((error) => {
                setTimeout(() => {
                    dispatch(isLoading(false));
                }, 100);
                let errorMessage = error.success ? error.success.data : error.success;
                return dispatch({
                    type: STATIC_ERROR_CODE,
                    payload: errorMessage,
                });
            });
    };
}

export function clearCode() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_CODE
        });
    };
}

export function isLoading(isLoading) {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING,
      isLoading: isLoading
    });
  }
}