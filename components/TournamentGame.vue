<template>
  <div class="TournamentGame">
    <div
      @click="updateGame(game.player1)"
      :class="getWinLoseStatus(game.player1.winner)"
      class="TournamentGame__player"
    >
      {{ getPlayerName(game.player1) }}
    </div>
    <div
      v-if="game.player2"
      @click="updateGame(game.player2)"
      :class="getWinLoseStatus(game.player2.winner)"
      class="TournamentGame__player"
    >
      {{ getPlayerName(game.player2) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Player, Game } from '~/models/tournament'

@Component({})
export default class TournamentGame extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  game!: Game

  getWinLoseStatus (winner: boolean) {
    if (winner === undefined) {
      return 'undecided'
    } else if (winner) {
      return 'winner'
    } else {
      return 'loser'
    }
  }

  updateGame (player: Player) {
    this.$emit('updateGame', player)
  }

  getPlayerName (player: Player) {
    if (player.id === '' || player.name === '') {
      return 'Coming soon...'
    } else {
      return player.name
    }
  }
}
</script>

<style lang="scss" scoped>
.TournamentGame {
  &__player {
    padding: 5px 10px;
    font-size: 1em;
    width: 160px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    &.undecided {
      background: #fff8db;
      color: #ff9900;
      font-weight: bold;
      &:hover {
        background: #ffe787;
      }
    }
    &.winner {
      color: #0dccac;
      background: #d6fff8;
      font-weight: bold;
    }
    &.loser {
      color: #aaa;
    }
    &.placeholder {
      color: #ccc;
    }

    @media screen and (max-width: 768px) {
      width: 140px;
    }
  }
}
</style>
