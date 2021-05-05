import { combineReducers } from 'redux';
import { changeStateReducer } from './ui.reducer';
import { employerCreation } from '../views/employers/employer.creation.reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  changeState: changeStateReducer,
  loadingBar: loadingBarReducer,
  employerCreation,
  alert
});

export default rootReducer;
