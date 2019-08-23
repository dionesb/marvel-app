export function updateCharacterRequest(data) {
  return {
    type: '@characters/UPDATE_CHARACTER_REQUEST',
    payload: data,
  };
}

export function updateCharacterSuccess(character) {
  return {
    type: '@characters/UPDATE_CHARACTER_SUCCESS',
    payload: character,
  };
}

export function addCharacter(character) {
  return {
    type: '@characters/ADD_CHARACTER',
    payload: character,
  };
}
