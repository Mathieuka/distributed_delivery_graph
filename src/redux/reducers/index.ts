import { combineReducers } from 'redux';
import { authReducer } from './auth_reducer';
import { dataReducer } from './data_reducer';
import { screenReducer } from './screen_reducer';

const rootReducer = combineReducers({
	authReducer,
	dataReducer,
	screenReducer,
});

export default rootReducer;
