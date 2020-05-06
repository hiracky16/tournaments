<template>
  <div class="TournamentGame">
    <div
      :class="winLoseStatus(game.player1.winner)"
      class="TournamentGame__player"
      @click="updateGame('player1')"
    >
      {{ getPlayerName(game.player1) }}
    </div>
    <div
      v-if="game.player2"
      :class="winLoseStatus(game.player2.winner)"
      class="TournamentGame__player"
      @click="updateGame('player2')"
    >
      {{ getPlayerName(game.player2) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, namespace } from 'nuxt-property-decorator'
import { Player, Game, PlayerKeys, GameParams } from '~/models/tournament'

const RoundStore = namespace('rounds')

@Component({})
export default class TournamentGame extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  gameIdx!: number

  @Prop({
    type: Number,
    required: true
  })
  roundIdx!: number

  @Prop({
    type: Object,
    required: true
  })
  game!: Game

  @RoundStore.Action('updateGameWinner')
  updateGameWinner!: (gameParams: GameParams) => void

  get winLoseStatus () {
    return (winner: boolean) => {
      if (winner === undefined) {
        return 'undecided'
      } else if (winner) {
        return 'winner'
      } else {
        return 'loser'
      }
    }
  }

  updateGame (player: PlayerKeys) {
    const newGame = {
      player1: { ...this.game.player1 },
      player2: { ...this.game.player2 }
    }

    Object.keys(newGame).forEach((key) => {
      newGame[key as PlayerKeys].winner = false
    })

    newGame[player].winner = true

    this.updateGameWinner({
      gameIdx: this.gameIdx,
      roundIdx: this.roundIdx,
      game: newGame
    })
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
