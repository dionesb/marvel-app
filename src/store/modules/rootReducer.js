import { combineReducers } from 'redux';

import search from './search/reducer';
import page from './page/reducer';

export default combineReducers({
  search,
  page,
});
