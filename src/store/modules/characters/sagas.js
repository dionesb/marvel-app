import { takeLatest, select, all, put } from 'redux-saga/effects';

import history from '~/services/history';

import { updateCharacterSuccess, addCharacter } from './actions';

export function* updateCharacter({ payload }) {
  const characterExist = yield select(state =>
    state.characters.find(p => p.id === payload.id)
  );

  if (characterExist) {
    yield put(updateCharacterSuccess(payload));
  } else {
    yield put(addCharacter(payload));
  }

  history.push(`../details/${payload.id}`);
}

export default all([
  takeLatest('@characters/UPDATE_CHARACTER_REQUEST', updateCharacter),
]);
