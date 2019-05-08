import { fork } from 'redux-saga/effects';
import {
    watchGetInitData,
    watchLogin,
    watchSignup
} from './auth';
import {
    watchGetArticleList,
    watchGetArticleById,
    watchCreateArticle,
    watchDeleteArticle
} from './article';

import {
    watchGetMaterialList
} from './material';

export default function* rootSaga() {
    yield fork(watchGetInitData);
    yield fork(watchLogin);
    yield fork(watchGetArticleList);
    yield fork(watchGetArticleById);
    yield fork(watchSignup);
    yield fork(watchCreateArticle);
    yield fork(watchGetMaterialList);
    yield fork(watchDeleteArticle);
}