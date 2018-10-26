const namespace = 'LOGOUT_FORM';
export const UNAUTH_USER = `UNAUTH_USER_${namespace}`;
export const CLEAR_LOGOUT = `CLEAR_LOGOUT_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_LOGOUT = `STATIC_ERROR_LOGOUT_${namespace}`;

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    localStorage.removeItem('token');
    setTimeout(() => {
      dispatch({
        type: CLEAR_LOGOUT,
        isAuth: false,
        userInfo: {}
      });

      dispatch(isLoading(false));
    }, 400);
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