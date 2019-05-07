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
        
        case types.RECEIVE_LOGIN_RESULT:
            return Object.assign({}, state, {
                signInMessage: action.signInMessage == 'True' ? '' : action.signInMessage,
                isLoggedIn: action.signInMessage == 200
            });

        case types.RECEIVE_SIGNUP_RESULT:
            return Object.assign({}, state, {
                signUpMessage: action.signUpMessage,
                isSignup: action.isSignup == 200
            });

        case types.LOGIN:
            return Object.assign({}, state, {
                message: ''
            });

        default:
            return state;
    }
}