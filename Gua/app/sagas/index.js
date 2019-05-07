import { fork } from 'redux-saga/effects';
import {
    watchGetInitData,
    watchLogin,
    watchSignup,
    // watchLogout
} from './auth';
import {
    watchGetArticleList,
    watchGetArticleById
} from './article';

export default function* rootSaga() {
    yield fork(watchGetInitData);
    yield fork(watchLogin);
    yield fork(watchGetArticleList);
    yield fork(watchGetArticleById);
    yield fork(watchSignup);
    // yield fork(watchLogout);
}