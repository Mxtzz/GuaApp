import * as types from '../constants/ActionTypes';

const defaultState = {
    
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case types.CLUB_LIST_RESULT:
            return Object.assign({}, state, {
                clubList: action.clubList
            });

        default:
            return state;
    }
}