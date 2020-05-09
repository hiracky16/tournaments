<template>
  <div class="TournamentGame">
    <div
      :class="[
        status(game.player1.winner),
        isEditable ? 'editable' : '',
      ]"
      class="TournamentGame__player"
      @click="updateGame('player1')"
    >
      {{ getPlayerName(game.player1) }}
    </div>
    <div
      v-if="game.player2"
      :class="[
        status(game.player2.winner),
        isEditable ? 'editable' : '',
      ]"
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

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  isEditable!: boolean

  @RoundStore.Action('updateGameWinner')
  updateGameWinner!: (gameParams: GameParams) => void

  get status () {
    return (winner: boolean) => {
      if (this.disabled) {
        return 'disabled'
      } else if (winner === undefined) {
        return 'undecided'
      } else if (winner) {
        return 'winner'
      } else {
        return 'loser'
      }
    }
  }

  get disabled () {
    if (this.game.player1.id !== '' && this.game.player2.id !== '') {
      return false
    } else {
      return true
    }
  }

  updateGame (player: PlayerKeys) {
    if (!this.isEditable) {
      return
    }

    if (this.disabled) {
      return
    }

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
    padding: 8px 10px;
    font-size: .85em;
    width: 180px;
    text-align: center;
    overflow: hidden;
    border-bottom: 1px solid;
    &:last-child {
      border-bottom: none;
    }
    &.editable {
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
    &.disabled {
      color: #666;
      cursor: auto;
      border-bottom-color: #ccc;
      &.editable {
        color: #999;
        background: #eee;
        &:hover {
          background: #eee;
          color: #999;
        }
      }
    }
    &.undecided {
      color: #999;
      font-weight: bold;
      background: #f5f5f5;
      border-bottom-color: #ccc;
      &.editable {
        color: #ff9900;
        background: #fff8db;
        border-bottom-color: #ffcc00;
        &:hover {
          background: #ffe787;
        }
      }
    }
    &.winner {
      color: #0dccac;
      font-weight: bold;
      border-bottom: none;
      background: #d6fff8;
      &.editable {
        &:hover {
          background: #d6fff8;
        }
      }
    }
    &.loser {
      color: #aaa;
      border-bottom: none;
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
