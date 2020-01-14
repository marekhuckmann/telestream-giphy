<template>
  <article class="gif">
    <figure>
      <img
        class="gif__image"
        :src="gif.source"
      />
      <figcaption class="gif__title">{{gif.title}}</figcaption>
    </figure>
    <button
      class="gif__button"
      @click="addToFavorites"
    >Dodaj do ulubionych</button>
  </article>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Gif',
  props: {
    gif: {
      type: Object,
      default: () => ({
        id: '',
        title: '',
        source: '',
      }),
    },
  },
  methods: {
    addToFavorites() {
      store.commit('addFavoriteGif', { gif: this.gif });
    },
  },
};
</script>

<style scoped lang="scss">

@import '../utilities/scss/mixins';

.gif {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  &__title {
    font-size: 16px;
    font-weight: 600;

    @media only screen and (min-width: 769px) {
      min-height: 24px;
    }
  }

  &__image {
    width: 300px;
    height: auto;
  }

  &__button {
    @include button;
  }
}

</style>
