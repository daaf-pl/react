const namespace = 'VIEW_ACTION';
export const FETCH_VIEW = `FETCH_VIEW_${namespace}`;

export function sendPageView(view) {
  return function (dispatch) {
    dispatch({
      type: FETCH_VIEW,
      payload: view,
    });
  };
}