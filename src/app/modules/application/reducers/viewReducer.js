import { FETCH_VIEW } from '../actions/viewAction';

const INITIAL_STATE = {
    view: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_VIEW:
            return { ...state, view: action.payload };
        default:
            return state;
    }
}