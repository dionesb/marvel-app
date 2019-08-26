import produce from 'immer';
import { toast } from 'react-toastify';

export const INITIAL_STATE = [];

export default function characters(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@characters/UPDATE_CHARACTER_SUCCESS':
      return produce(state, draft => {
        const characterIndex = draft.findIndex(p => p.id === action.payload.id);

        if (characterIndex >= 0) {
          draft[characterIndex].name = action.payload.name;
          draft[characterIndex].description = action.payload.description;
          draft[characterIndex].thumbnail = action.payload.thumbnail;
        }
        toast.success('O personagem foi atualizado com sucesso');
      });
    case '@characters/ADD_CHARACTER':
      return produce(state, draft => {
        draft.push(action.payload);
        toast.success('O personagem foi atualizado com sucesso');
      });
    default:
      return state;
  }
}
