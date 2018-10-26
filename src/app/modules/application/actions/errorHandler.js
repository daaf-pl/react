// import _ from 'lodash';

export function errorHandler(dispatch, error, type) {
    console.log('Error type: ', type);
    console.log(error);
    console.log(type);

    // let errorMessage = error.success ? error.success.data : error.success;
    let errorMessage = error ? error.success.data : type;

    //   NOT AUTHENTICATED ERROR
    /*if (error.status === 401 || error.response.status === 401) {
    errorMessage = 'You are not authorized to do this.';
    console.log(errorMessage);
    //return dispatch(errorMessage);
    // return dispatch(logoutUser(errorMessage));
    }*/

    return dispatch({
        type,
        payload: errorMessage,
    });
}