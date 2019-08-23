import { combineReducers } from 'redux';

import search from './search/reducer';
import page from './page/reducer';
import characters from './characters/reducer';

export default combineReducers({
  search,
  page,
  characters,
});
