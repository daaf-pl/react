import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './app/modules/application/reducers/index';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { checkIsAuth } from './app/modules/application/actions/auth';

import 'jquery';
import 'popper.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');

if (token) {
    // console.log(token);
    store.dispatch(checkIsAuth(token));
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
