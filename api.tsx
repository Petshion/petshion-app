import axios from 'axios';

const makeRequest = (path: any, params: any) =>
  axios.get(`https://api.petshion.com/3${path}`, {
    params: {
      ...params,
      // api_key: TMDB_KEY,
    },
  });

const getAnything = async (path: any, params = {}) => {
  try {
    const {
      data: {results},
      data,
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export const mainApi = {
  banner: () => getAnything('/main/banner'),
  lately: () => getAnything('/main/lately'),
  /* search: (query) => getAnything('/search/tv', { query }),
  show: (id) => getAnything(`/tv/${id}`, { append_to_response: 'videos' }), */
};