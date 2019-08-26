import reducer, { INITIAL_STATE } from '~/store/modules/characters/reducer';
import {
  updateCharacterSuccess,
  addCharacter,
} from '~/store/modules/characters/actions';

describe('Characters reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('UPDATE_CHARACTER_SUCCESS', () => {
    const state = reducer(
      [
        {
          id: 'character_id',
          name: 'Character name',
          description: 'Character description',
          thumbnail: 'character_thumbnail',
        },
      ],
      updateCharacterSuccess({
        id: 'character_id',
        name: 'Character name updated',
        description: 'Character description updated',
        thumbnail: 'character_thumbnail_updated',
      })
    );

    expect(state).toStrictEqual([
      {
        id: 'character_id',
        name: 'Character name updated',
        description: 'Character description updated',
        thumbnail: 'character_thumbnail_updated',
      },
    ]);
  });

  it('ADD_CHARACTER', () => {
    const state = reducer(
      INITIAL_STATE,
      addCharacter({
        id: 'character_id',
        name: 'Character name',
        description: 'Character description',
        thumbnail: 'character_thumbnail',
      })
    );

    expect(state).toStrictEqual([
      {
        id: 'character_id',
        name: 'Character name',
        description: 'Character description',
        thumbnail: 'character_thumbnail',
      },
    ]);
  });
});
