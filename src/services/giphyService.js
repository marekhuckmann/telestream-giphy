import axios from 'axios';

let service;

class GiphyService {
  constructor() {
    this.key = 'EwQCHDTYU2onchg4pwYQmRFRcugz5ySa';
    this.scriptUrl = 'http://api.giphy.com/v1/gifs/search';
  }

  getGifs(query) {
    return axios.get(`${this.scriptUrl}?q=${query}&api_key=${this.key}&limit=5`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.data.map(gif => ({
            id: gif.id,
            title: gif.title,
            source: gif.images.original.url,
            thumbnail: gif.images.fixed_height_small.url,
          }));
        }

        return [];
      })
      .catch(() => []);
  }
}

function giphyService() {
  if (!service) {
    service = new GiphyService();
  }

  return service;
}

export default giphyService;
