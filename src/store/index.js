import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gifs: [],
    favoriteGifs: [],
  },
  mutations: {
    setGifs: (state, payload) => {
      state.gifs = payload.newGifs;
    },
    setFavoriteGifs: (state, payload) => {
      state.favoriteGifs = payload.gifs;
    },
    addFavoriteGif: (state, payload) => {
      // check for duplcates
      if (!state.favoriteGifs.find(favoriteGif => favoriteGif.id === payload.gif.id)) {
        state.favoriteGifs.push(payload.gif);
        setFavoriteGifsInLocalStorage();
      }
    },
    removeFromFavorites: (state, payload) => {
      state.favoriteGifs = state.favoriteGifs.filter(gif => gif.id !== payload.id);
      setFavoriteGifsInLocalStorage();
    },
  },
});

function setFavoriteGifsInLocalStorage() {
  localStorage.setItem('favoriteGifs', JSON.stringify(store.state.favoriteGifs));
}

export default store;
