import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const mainStore = createStore(reducers, applyMiddleware(thunk));

export default mainStore;