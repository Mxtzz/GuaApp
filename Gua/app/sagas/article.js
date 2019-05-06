import {
    Platform,
    Alert
} from 'react-native';
import { fork, take, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import requstUtil from '../utils/RequestUtil';
import * as appSettings from '../constants/AppSettings';
import SessionUtil from '../utils/SessionUtil';

export function* watchGetArticleList() {
    yield takeLatest(types.GET_ARTICLE_LIST, getArticleList);
}

export function* getArticleList() {
    yield put({
        type: types.SHOW_LOADING
    });

    let articleList = [];
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}article/getList?page=1&pageSize=6`, 'get');
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    console.log(results);

    if(results.code == 200){
        articleList = results.rows;
    }
    

    yield put({
        type: types.RECEIVE_ARTICLE_LIST_RESULT,
        articleList: articleList
    });

    yield put({
        type: types.HIDE_LOADING
    });
}

export function* watchGetArticleById() {
    yield takeLatest(types.GET_ARTICLE_BY_ID, getArticleById);
}

export function* getArticleById({ id }) {
    yield put({
        type: types.SHOW_LOADING
    });

    let articleById = [];
    let results = {};
    try {
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}article/get/${id}`, 'get');
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    console.log(results);

    if(results.code == 200){
        articleById = results.data;
    }
    
    yield put({
        type: types.RECEIVE_ARTICLE_BY_ID_RESULT,
        articleById: articleById,
    });

    yield put({
        type: types.HIDE_LOADING
    });
}
