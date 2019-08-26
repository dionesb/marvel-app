import { runSaga } from 'redux-saga';
import { useSelector } from 'react-redux';

import {
  updateCharacterSuccess,
  addCharacter,
} from '~/store/modules/characters/actions';
import { updateCharacter } from '~/store/modules/characters/sagas';

import { store } from '~/store';

jest.mock('react-redux');

describe('Characters saga', () => {
  it('should be able update a character in localStorage', async () => {
    const dispatch = jest.fn();

    await runSaga(
      { dispatch, getState: () => ({ characters: [{ id: 'character_id' }] }) },
      updateCharacter,
      {
        payload: { id: 'character_id' },
      }
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      updateCharacterSuccess({ id: 'character_id' })
    );
  });

  it('should be able add a character in localStorage', async () => {
    const dispatch = jest.fn();

    await runSaga(
      { dispatch, getState: () => ({ characters: [{ id: 'character_id' }] }) },
      updateCharacter,
      {
        payload: { id: 'character_id_new' },
      }
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      addCharacter({ id: 'character_id_new' })
    );
  });
});
