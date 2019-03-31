import * as types from '../constants/ActionTypes';

const defaultState = {
    isLoading: false,
    loadingText: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case types.SHOW_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
                loadingText: action.loadingText || ''
            });

        case types.HIDE_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
                loadingText: ''
            });

        default:
            return state;
    }
}