import * as types from '../constants/ActionTypes';

export function getMaterialList() {
    return {
        type: types.GET_MATERIAL_LIST
    };
}

// export function getArticleById(id) {
//     return {
//         type: types.GET_ARTICLE_BY_ID,
//         id: id
//     };
// }

// export function createArticle(title, content){
//     return {
//         type: types.CREATE_ARTICLE,
//         title: title,
//         content: content
//     }
// }