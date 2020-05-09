import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/index';

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
