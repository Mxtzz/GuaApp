import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import requstUtil from '../utils/RequestUtil';
import * as appSettings from '../constants/AppSettings';
import SessionUtil from '../utils/SessionUtil';

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login);
}

export function* login({ username, password }) {
    yield put({
        type: types.SHOW_LOADING
    });


    // const session = yield call(SessionUtil.get);
    // ('UserName', '@' + MD5(username.toLowerCase()));
    // ('Password', MD5(password).toString());
    let data = {
        "username": username,
        "password": password
    }
    
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}login`, 'post', JSON.stringify(data));
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }

    if(results.code == 200){
        let session = {
            isLogin: true,
            username: results.username,
            token: results.token,
            auth: results.auth
        }
        SessionUtil.set(session);
    }
    
    yield put({
        type: types.RECEIVE_LOGIN_RESULT,
        signInMessage: results.code
    });

    yield put({
        type: types.HIDE_LOADING
    });
}

export function* watchSignup() {
    yield takeLatest(types.SIGNUP, signup);
}

export function* signup({ username, password }) {
    yield put({
        type: types.SHOW_LOADING
    });

    let data = {
        "username": username,
        "password": password
    }
    
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}register`, 'post', JSON.stringify(data));
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }

    if(results.code == 200){
        yield put({
            type: types.RECEIVE_SIGNUP_RESULT,
            isSignup: results.code,
            signUpMessage: results.message
        });
    }

    yield put({
        type: types.HIDE_LOADING
    });
}

// export function* watchLogout() {
//     yield takeLatest(types.LOGOUT, logout);
// }
// export function* logout() {
//     yield put({
//         type: types.SHOW_LOADING
//     });

//     SessionUtil.clear().then(() => {

//     });

//     yield put({
//         type: types.RECEIVE_LOGOUT_RESULT,
//         signInMessage: results.code
//     });

//     yield put({
//         type: types.HIDE_LOADING
//     });
// }