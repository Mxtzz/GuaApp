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

        default:
            return state;
    }
}