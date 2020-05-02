<template>
  <div class="TournamentGame">
    <div class="TournamentGame__player">
      {{ game.player1.name }}
    </div>
    <div v-if="game.player2" class="TournamentGame__player">
      {{ game.player2.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Game } from '~/models/tournament'

@Component({})
export default class TournamentGame extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  game!: Game
}
</script>

<style lang="scss" scoped>
.TournamentGame {
  &__player {
    padding: 5px 10px;
    font-size: 18px;
    width: 160px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
