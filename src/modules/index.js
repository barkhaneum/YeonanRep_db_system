import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import checkbox_state from './checkbox_state';

//**** Reducer 모듈 ****
const rootReducer = combineReducers({ // <== App.js의 getState함수에 값들을 전달함
  // counter, 
  // todos,
  test_redux :checkbox_state,
});

export default rootReducer;