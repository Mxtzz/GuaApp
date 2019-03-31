import * as types from '../constants/ActionTypes';

const defaultState = {
    isLoggedIn: false,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_INIT_DATA:
            return Object.assign({}, state, {
                isLoggedIn: true
            });
        


        case types.LOGIN:
            return Object.assign({}, state, {
                message: ''
            });

        default:
            return state;
    }
}