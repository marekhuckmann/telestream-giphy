<template>
  <form
    class="search-bar"
    @submit.prevent="searchGiphy"
  >
    <input
      class="search-bar__input"
      v-model="value"
    />
    <button class="search-bar__button">Szukaj</button>
    <div
      v-if="noResults"
      class="search-bar__no-results"
    >Nie znaleziono GIFów!</div>
  </form>
</template>

<script>
import store from '../store/index';
import giphyService from '../services/giphyService';

export default {
  name: 'SearchBar',
  data() {
    return {
      value: '',
      noResults: false,
    };
  },
  methods: {
    searchGiphy() {
      giphyService().getGifs(this.value)
        .then(data => this.searchedGifsHandler(data));
    },
    searchedGifsHandler(newGifs) {
      store.commit('setGifs', { newGifs });
      this.noResults = newGifs.length === 0;
    },
  },
};
</script>

<style scoped lang="scss">

@import '../utilities/scss/mixins';

.search-bar {
  display: flex;
  justify-content: center;
  position: relative;

  &__input {
    font-size: 16px;
    font-weight: bold;
    border-radius: 3px;
    height: 32px;
    border: 2px solid #34495E;
    margin-right: 2px;
    outline: 0;
  }

  &__button {
    @include button;
  }

  &__no-results {
    position: absolute;
    top: calc(100% + 10px);
  }
}

</style>
