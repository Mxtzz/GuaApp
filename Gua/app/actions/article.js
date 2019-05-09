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

export function createArticle(title, content){
    return {
        type: types.CREATE_ARTICLE,
        title: title,
        content: content
    }
}

export function deleteArticle(id){
    return {
        type: types.DELETE_ARTICLE,
        id: id
    }
}

export function comment(articleId, content){
    return {
        type: types.COMMENT,
        articleId: articleId,
        content: content
    }
}