import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import article from './article';
import material from './material'

const rootReducer = combineReducers({    
    auth,
    common,
    article,
    material
});

export default rootReducer;