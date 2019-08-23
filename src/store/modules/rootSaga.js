import { all } from 'redux-saga/effects';

import search from './search/sagas';
import page from './page/sagas';
import characters from './characters/sagas';

export default function* rootSaga() {
  return yield all([search, page, characters]);
}
