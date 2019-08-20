import produce from 'immer';

const INITIAL_STATE = {
  number: 0,
};

export default function page(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@search/SEARCH_REQUEST':
      return produce(state, draft => {
        draft.number = 0;
      });
    case '@page/PAGE_PREVIEW':
      return produce(state, draft => {
        if (draft.number > 0) draft.number -= 1;
      });
    case '@page/PAGE_NEXT':
      return produce(state, draft => {
        draft.number += 1;
      });
    default:
      return state;
  }
}
