import produce from 'immer';
import history from '~/services/history';

const INITIAL_STATE = {
  search: '',
};

export default function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@search/SEARCH_REQUEST':
      return produce(state, draft => {
        draft.search = action.payload.search;

        history.push('/');
      });
    default:
      return state;
  }
}
