export function searchRequest(search) {
  return {
    type: '@search/SEARCH_REQUEST',
    payload: { search },
  };
}
