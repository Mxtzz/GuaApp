import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import article from './article';

const rootReducer = combineReducers({    
    auth,
    common,
    article
});

export default rootReducer;