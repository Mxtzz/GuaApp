import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import article from './article';
import material from './material';
import club from './club';

const rootReducer = combineReducers({    
    auth,
    common,
    article,
    material,
    club
});

export default rootReducer;