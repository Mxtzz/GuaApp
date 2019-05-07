import * as types from '../constants/ActionTypes';

const defaultState = {
    
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case types.RECEIVE_MATERIAL_LIST:
            return Object.assign({}, state, {
                materialList: action.materialList
            });

        // case types.RECEIVE_ARTICLE_BY_ID_RESULT:
        //     return Object.assign({}, state, {
        //         articleById: action.articleById
        //     });

        // case types.RECEIVE_CREATE_ARTICLE_RESULT:
        //     return Object.assign({}, state, {
        //         createArticleResult: {...action.createArticleResult}
        //     })

        default:
            return state;
    }
}