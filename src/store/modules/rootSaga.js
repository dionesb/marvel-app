import { all } from 'redux-saga/effects';

import search from './search/sagas';
import page from './page/sagas';

export default function* rootSaga() {
  return yield all([search, page]);
}
