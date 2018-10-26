const namespace = 'FETCH_CALENDAR';
export const FETCH_CALENDAR = `FETCH_CALENDAR_${namespace}`;
export const IS_LOADING = `IS_LOADING_${namespace}`;
export const STATIC_ERROR_CALENDAR = `STATIC_ERROR_CALENDAR_${namespace}`;
export const CLEAR_CALENDAR = `CLEAR_CALENDAR_${namespace}`;

export function fetchCalendar() {
    return function (dispatch) {
        dispatch(isLoading('show'));
        setTimeout(() => {
            dispatch(isLoading(''));
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

export function clearCalendar() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_CALENDAR,
            isLoading: 'show'
        });
    };
}