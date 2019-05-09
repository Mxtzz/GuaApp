import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import requstUtil from '../utils/RequestUtil';
import * as appSettings from '../constants/AppSettings';
import SessionUtil from '../utils/SessionUtil';

export function* watchGetClubList() {
    yield takeLatest(types.GET_CLUB_LIST, getClubList);
}

export function* getClubList() {
    yield put({
        type: types.SHOW_LOADING
    });

    let clubList = [];
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}club/getList`, 'get');
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    console.log(results);

    if (results.code == 200) {
        clubList = results.rows;
    }

    yield put({
        type: types.CLUB_LIST_RESULT,
        clubList: clubList
    });

    yield put({
        type: types.HIDE_LOADING
    });
}
