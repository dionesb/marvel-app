export function searchRequest(search) {
  return {
    type: '@search/SEARCH_REQUEST',
    payload: { search },
  };
}

export function searchSuccess(characters) {
  return {
    type: '@search/SEARCH_SUCCESS',
    payload: { characters },
  };
}
