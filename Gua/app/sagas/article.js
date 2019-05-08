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

    if (results.code == 200) {
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

    if (results.code == 200) {
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

export function* watchCreateArticle() {
    yield takeLatest(types.CREATE_ARTICLE, createArticle);
}

export function* createArticle({ title, content }) {
    yield put({
        type: types.SHOW_LOADING
    });

    let params = {
        title: title,
        content: content,
        categories: [''],
        tags: ['']
    }

    let results = "";
    let session = "";
    try {
        session = yield call(SessionUtil.get);
        session = JSON.parse(session);
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}article/create`, 'post', JSON.stringify(params), session.token);
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    // console.log(results);

    yield put({
        type: types.RECEIVE_CREATE_ARTICLE_RESULT,
        createArticleResult: results.code == 200 ? true : false,
    });

    yield put({
        type: types.HIDE_LOADING
    });
}

export function* watchDeleteArticle(){
    yield takeLatest(types.DELETE_ARTICLE, deleteArticle);
}

export function* deleteArticle({id}){
    yield put({
        type: types.SHOW_LOADING
    });

    let params = {}
    let results = "";
    let session = "";
    try {
        session = yield call(SessionUtil.get);
        session = JSON.parse(session);
        results = yield call(requstUtil.request, `${appSettings.GUA_API_URL()}article/delete?articleId=${id}`, 'delete', JSON.stringify(params), session.token);
    } catch (error) {
        results = { Message: JSON.stringify(error) };
    }
    console.log(results);

    yield put({
        type: types.DELETE_ARTICLE_RESULT,
        deleteArticleResult: results.code == 200 ? true : false,
    });

    yield put({
        type: types.HIDE_LOADING
    });
}