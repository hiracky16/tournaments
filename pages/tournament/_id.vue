<template>
  <div>
    <client-only placeholder="Loading...">
      <bracket :rounds="rounds">
        <template #player="{ player }">
          {{ player.name }}
        </template>
      </bracket>
    </client-only>
    <nuxt-link to="/tournaments">
      トーナメント一覧へ戻る
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class TournamentDetail extends Vue {
  get rounds () {
    return [
      {
        games: [
          {
            player1: { id: '1', name: 'Competitor 1' },
            player2: { id: '4', name: 'Competitor 4' }
          },
          {
            player1: { id: '5', name: 'Competitor 5', winner: false },
            player2: { id: '8', name: 'Competitor 8', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 1', winner: false },
            player2: { id: '4', name: 'Competitor 4', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 5', winner: false },
            player2: { }
          }
        ]
      },
      {
        games: [
          {
            player1: { },
            player2: { }
          },
          {
            player1: { },
            player2: { }
          }
        ]
      },
      {
        games: [
          {
            player1: { },
            player2: { }
          }
        ]
      }
    ]
  }
}
</script>
