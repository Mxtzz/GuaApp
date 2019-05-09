import * as types from '../constants/ActionTypes';

const defaultState = {
    // isLoggedIn: false,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case types.RECEIVE_ARTICLE_LIST_RESULT:
            return Object.assign({}, state, {
                articleList: action.articleList
            });

        case types.RECEIVE_ARTICLE_BY_ID_RESULT:
            return Object.assign({}, state, {
                articleById: action.articleById
            });

        case types.RECEIVE_CREATE_ARTICLE_RESULT:
            return Object.assign({}, state, {
                createArticleResult: {...action.createArticleResult}
            })

        case types.DELETE_ARTICLE_RESULT:
            return Object.assign({}, state, {
                deleteArticleResult: {...action.deleteArticleResult}
            })

        case types.COMMENT_RESULT:
            return Object.assign({}, state, {
                ...action
            })

        default:
            return state;
    }
}