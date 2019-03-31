import * as types from '../constants/ActionTypes';

export function login(username, password, deviceSerialNum, rememberIsChecked) {
    return {
        type: types.LOGIN,
        username: username,
        password: password,
        deviceSerialNum: deviceSerialNum,
        rememberIsChecked: rememberIsChecked
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

export function getInitData(authenticationId) {
    return {
        type: types.GET_INIT_DATA,
        authenticationId: authenticationId
    };
}


export function logout() {
    return {
        type: types.LOGOUT
    };
}
