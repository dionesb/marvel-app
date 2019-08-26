import reducer, { INITIAL_STATE } from '~/store/modules/search/reducer';
import { searchRequest } from '~/store/modules/search/actions';

describe('Search reducer', () => {
  it('DEFAUTL', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('SEARCH_REQUEST', () => {
    const state = reducer(undefined, searchRequest('startsWith'));

    expect(state).toStrictEqual({ search: 'startsWith' });
  });
});
