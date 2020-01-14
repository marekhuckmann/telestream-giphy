<template>
  <div id="app">
    <header>
      <h1 class="app__headline">Wyszukiwarka GIFów</h1>
    </header>
    <SearchBar class="app__search-bar" />
    <div class="app__gifs">
      <Gif
        v-for="gif in gifs"
        :key="gif.id"
        :gif="gif"
        class="app__gif"
      />
      <img
        class="app__attribution-mark"
        alt="Giphy attribution mark"
        src="./assets/poweredByGiphy.png"
      >
    </div>
    <FavoriteGifs class="app__favorite-gifs" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import Gif from './components/Gif.vue';
import FavoriteGifs from './components/FavoriteGifs.vue';
import store from './store/index';

export default {
  name: 'app',
  components: {
    SearchBar,
    Gif,
    FavoriteGifs,
  },
  mounted() {
    this.getFavoriteGifsFromLocalStorage();
  },
  computed: {
    gifs() {
      return store.state.gifs;
    },
  },
  methods: {
    getFavoriteGifsFromLocalStorage() {
      const favoriteGifs = localStorage.getItem('favoriteGifs');
      if (favoriteGifs) {
        store.commit('setFavoriteGifs', { gifs: JSON.parse(favoriteGifs) });
      }
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  &__headline {
    margin: 20px 0;
  }

  &__search-bar {
    margin-bottom: 30px;
  }

  &__gifs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 220px;
    padding: 40px;
  }

  &__gif {
    margin: 10px;
  }

  &__attribution-mark {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  &__favorite-gifs {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 2px solid #34495E;
    background-color: rgba(#41B883, 0.1);
  }
}

</style>
