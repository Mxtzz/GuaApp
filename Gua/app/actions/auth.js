import * as types from '../constants/ActionTypes';

export function getInitData() {
    return {
        type: types.GET_INIT_DATA
    };
}

export function login(username, password) {
    return {
        type: types.LOGIN,
        username: username,
        password: password
    };
}

export function signup(username, password, nickname) {
    return {
        type: types.SIGNUP,
        username: username,
        password: password,
        nickname: nickname
    };
}

export function sendNewUserCreate(email, fullName, phone) {
    return {
        type: types.SENDNEWUSERCREATE,
        email: email,
        fullName: fullName,
        phone: phone
    };
}

export function resetSignUpMessage() {
    return {
        type: types.RESET_SIGN_UP_MESSAGE
    }
}

export function sendPasswordResetEmail(email) {
    return {
        type: types.SENDPASSWORDRESET,
        email: email
    };
}

export function resetResetPasswordMessage() {
    return {
        type: types.RESET_PASSWORD_MESSAGE
    }
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}
