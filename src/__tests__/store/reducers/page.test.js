import reducer, { INITIAL_STATE } from '~/store/modules/page/reducer';
import { pageNext, pagePreview } from '~/store/modules/page/actions';
import { searchRequest } from '~/store/modules/search/actions';

describe('Page reducer', () => {
  it('DEFAUTL', () => {
    const state = reducer(INITIAL_STATE, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('SEARCH_REQUEST', () => {
    const state = reducer(INITIAL_STATE, searchRequest('startsWith'));

    expect(state).toStrictEqual({ number: 0 });
  });

  it('PAGE_PREVIEW', () => {
    const state = reducer({ number: 1 }, pagePreview());

    expect(state).toStrictEqual({ number: 0 });
  });

  it('PAGE_NEXT', () => {
    const state = reducer(undefined, pageNext());

    expect(state).toStrictEqual({ number: 1 });
  });
});
