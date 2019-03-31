import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';


export function* watchGetInitData() {
    yield takeLatest(types.GET_INIT_DATA, getInitData);
}

export function* getInitData({ authenticationId }) {
    // yield put({
    //     type: types.SHOW_LOADING,
    //     loadingText: 'Data Initializing...'
    // });

    console.log("123");

    // yield put({
    //     type: types.HIDE_LOADING
    // });
}