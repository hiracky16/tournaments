<template>
  <div>
    <nuxt-link to="/tournaments" class="link-back">
      ←トーナメント一覧へ戻る
    </nuxt-link>
    <TournamentCard :rounds="rounds" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import TournamentCard from '~/components/TournamentCard.vue'

@Component({
  components: { TournamentCard }
})
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

<style lang="scss" scoped>
  .link-back {
    color: #333;
    display: inline-block;
    margin-bottom: 16px;
  }
</style>
