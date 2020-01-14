<template>
  <footer
    class="favorite-gifs"
    :class="{'favorite-gifs--open': open}"
  >
    <h2 class="favorite-gifs__headline">Ulubione</h2>
    <button
      v-if="favoriteGifs.length"
      class="favorite-gifs__opener"
      @click="open = !open"
    >{{openerLabel}}</button>
    <div class="favorite-gifs__items">
      <article
        v-for="gif in favoriteGifs"
        :key="gif.id"
        class="favorite-gifs__item"
      >
        <button
          class="favorite-gifs__button"
          @click="removeFromFavorites(gif.id)"
        >&#10005;</button>
        <figure
          class="favorite-gifs__figure"
          @click="copyToClipboard(gif.source)"
        >
          <img
            class="favorite-gifs__image"
            :src="gif.thumbnail"
          />
          <figcaption class="favorite-gifs__title">{{gif.title}}</figcaption>
        </figure>
      </article>
      <div
        v-if="!favoriteGifs.length"
        class="favorite-gifs__none"
      >Brak ulubionych GIFów</div>
    </div>
    <span
      v-if="justCopied"
      class="favorite-gifs__tooltip"
    >Skopiowano URL do schowka</span>
  </footer>
</template>

<script>
import store from '../store/index';

export default {
  name: 'FavoriteGifs',
  computed: {
    favoriteGifs() {
      return store.state.favoriteGifs;
    },
    openerLabel() {
      return this.open ? 'Schowaj' : 'Wysuń';
    },
  },
  data() {
    return {
      open: false,
      justCopied: false,
    };
  },
  methods: {
    removeFromFavorites(id) {
      store.commit('removeFromFavorites', { id });
    },
    copyToClipboard(source) {
      navigator.clipboard.writeText(source).then(() => {
        this.justCopied = true;
        setTimeout(() => {
          this.justCopied = false;
        }, 1000);
      }, (err) => {
        console.error('Async: Could not copy text: ', err);
      });
    },
  },
};
</script>

<style scoped lang="scss">

@import '../utilities/scss/mixins';

.favorite-gifs {
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: #ebf8f2;
  max-height: 200px;
  transition: max-height 0.6s ease-in;

  &--open {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }

  &__headline {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 5px;
  }

  &__opener {
    @include button;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__figure {
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  &__item {
    background: white;
    padding: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    margin: 5px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
  }

  &__button {
    font-size: 20px;
    font-weight: bold;
    border: none;
    display: block;
    margin-left: auto;
    transition: opacity 0.3s;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }

  &__tooltip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    border: 1px solid #34495E;
    padding: 5px;
    border-radius: 3px;
    background-color: white;
    z-index: 2;
    box-shadow: 0 2px 20px 5px rgb(0, 0, 0);
  }
}

</style>
