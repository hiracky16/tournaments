<template>
  <div class="TournamentIndexTemplate">
    <div class="card TournamentIndexTemplate__card">
      <div class="TournamentIndexTemplate__nav">
        <div class="TournamentIndexTemplate__nav-left">
          <nuxt-link to="/home" class="link-nav">
            ←ホームへ戻る
          </nuxt-link>
        </div>
        <div class="TournamentIndexTemplate__nav-left">
          <nuxt-link :to="`/tournament/${$route.params.id}/edit`" class="link-button">
            このトーナメントを編集
          </nuxt-link>
        </div>

      </div>
      <TournamentLayout :rounds="rounds" :isEditable="false" />
    </div>
  </div>  
</template>
e
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TournamentLayout from '~/components/TournamentLayout.vue'
import { Game } from '~/models/tournament'

@Component({
  components: { TournamentLayout }
})
export default class TournamentIndexTemplate extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  rounds!: {
    games: Game[]
  }[];
}
</script>

<style lang="scss" scoped>
.TournamentIndexTemplate {
  &__card {
    padding: 30px;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
.link-nav {
  color: #666;
}
.link-button {
  display: inline-block;
  padding: 10px 16px;
  background: #f5576c;
  background-image: linear-gradient(120deg, #fb93c7 0%, #f5576c 100%);
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
</style>
