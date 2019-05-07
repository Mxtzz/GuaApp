import * as types from '../constants/ActionTypes';

const defaultState = {
    isLoggedIn: false,
    username: '',
    auth: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case types.INIT_DATA_SUCCESSS:
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn,
                username: action.username,
                auth: action.auth
            });

        case types.RECEIVE_LOGIN_RESULT:
            return Object.assign({}, state, {
                isLoggedIn: action.signInMessage == 200,
                username: action.username,
                auth: action.auth
            });

        case types.RECEIVE_SIGNUP_RESULT:
            return Object.assign({}, state, {
                signUpMessage: action.signUpMessage,
                isSignup: action.isSignup == 200
            });

        default:
            return state;
    }
}