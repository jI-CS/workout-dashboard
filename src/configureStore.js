import {createStore, applyMiddleware} from 'redux';
import root from './reducers/rootReducer';
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'

const configureStore = () => {
   const middlewares = [thunk];
   const persistedUser = sessionStorage.getItem('user');
   if (process.env.NODE_ENV !== 'production')
      middlewares.push(logger)
   const store = createStore(root, {user: JSON.parse(persistedUser)}, applyMiddleware(...middlewares));
   console.log(store.getState());
   return store;
}

export default configureStore;