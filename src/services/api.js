import axios from 'axios';

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
  params: {
    ts: '1',
    apikey: 'd14feaabc55ade996eeb51b7a7b57526',
    hash: '4363dd78fbe84f0f61107fb3f916b42c',
  },
});

export default api;
