import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootRedeucer from '../reducers';

const store = createStore(
  rootRedeucer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
