import * as types from '../constants/ActionTypes';

export function getArticleList() {
    return {
        type: types.GET_ARTICLE_LIST
    };
}

export function getArticleById(id) {
    return {
        type: types.GET_ARTICLE_BY_ID,
        id: id
    };
}