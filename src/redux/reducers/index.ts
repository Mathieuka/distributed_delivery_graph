import { combineReducers } from 'redux';
import { authReducer } from './auth_reducer';
import { dataReducer } from './data_reducer';

const rootReducer = combineReducers({
    authReducer,
    dataReducer
});

export default rootReducer;
