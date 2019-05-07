import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import requstUtil from '../utils/RequestUtil';
import * as appSettings from '../constants/AppSettings';
import SessionUtil from '../utils/SessionUtil';

export function* watchGetMaterialList() {
    yield takeLatest(types.GET_MATERIAL_LIST, getMaterialList);
}

export function* getMaterialList() {
    yield put({
        type: types.SHOW_LOADING
    });

    let materialList = [];
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}material/getList?page=1&pageSize=6`, 'get');
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    console.log(results);

    if (results.code == 200) {
        materialList = results.rows;
    }


    yield put({
        type: types.RECEIVE_MATERIAL_LIST,
        materialList: materialList
    });

    yield put({
        type: types.HIDE_LOADING
    });
}
