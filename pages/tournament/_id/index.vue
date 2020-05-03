<template>
  <TournamentIndexTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import TournamentIndexTemplate from '~/components/templates/tournament/_id/TournamentIndexTemplate.vue'

@Component({
  components: { TournamentIndexTemplate }
})
export default class TournamentDetail extends Vue {
  get rounds () {
    return [
      {
        games: [
          {
            player1: { id: '1', name: 'Competitor 1-1' },
            player2: { id: '4', name: 'Competitor 1-2' }
          },
          {
            player1: { id: '5', name: 'Competitor 1-3', winner: false },
            player2: { id: '8', name: 'Competitor 1-4', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 1-5', winner: false },
            player2: { id: '4', name: 'Competitor 1-6', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 1-7', winner: false },
            player2: { id: '5', name: 'Competitor 1-8', winner: false }
          },
          {
            player1: { id: '1', name: 'Competitor 1-9' },
            player2: { id: '4', name: 'Competitor 1-10' }
          },
          {
            player1: { id: '5', name: 'Competitor 1-11', winner: false },
            player2: { id: '8', name: 'Competitor 1-12', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 1-13', winner: false },
            player2: { id: '4', name: 'Competitor 1-14', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 1-15', winner: false },
            player2: { id: '5', name: 'Competitor 1-16', winner: false }
          },
          {
            player1: { id: '1', name: 'Competitor 1-17' },
            player2: { id: '4', name: 'Competitor 1-18' }
          },
          {
            player1: { id: '5', name: 'Competitor 1-19', winner: false },
            player2: { id: '8', name: 'Competitor 1-20', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 1-21', winner: false },
            player2: { id: '4', name: 'Competitor 1-22', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 1-23', winner: false },
            player2: { id: '5', name: 'Competitor 1-24', winner: false }
          },
          {
            player1: { id: '1', name: 'Competitor 1-25' },
            player2: { id: '4', name: 'Competitor 1-26' }
          },
          {
            player1: { id: '5', name: 'Competitor 1-27', winner: false },
            player2: { id: '8', name: 'Competitor 1-28', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 1-29', winner: false },
            player2: { id: '4', name: 'Competitor 1-30', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 1-31', winner: false },
            player2: { id: '5', name: 'Competitor 1-32', winner: false }
          }
        ]
      },
      {
        games: [
          {
            player1: { id: '1', name: 'Competitor 2-1' },
            player2: { id: '4', name: 'Competitor 2-2' }
          },
          {
            player1: { id: '5', name: 'Competitor 2-3', winner: false },
            player2: { id: '8', name: 'Competitor 2-4', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 2-5', winner: false },
            player2: { id: '4', name: 'Competitor 2-6', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 2-7', winner: false },
            player2: { id: '5', name: 'Competitor 2-8', winner: false }
          },
          {
            player1: { id: '1', name: 'Competitor 2-9' },
            player2: { id: '4', name: 'Competitor 2-10' }
          },
          {
            player1: { id: '5', name: 'Competitor 2-11', winner: false },
            player2: { id: '8', name: 'Competitor 2-12', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 2-13', winner: false },
            player2: { id: '4', name: 'Competitor 2-14', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 2-15', winner: false },
            player2: { id: '5', name: 'Competitor 2-16', winner: false }
          }
        ]
      },
      {
        games: [
          {
            player1: { id: '1', name: 'Competitor 3-1' },
            player2: { id: '4', name: 'Competitor 3-2' }
          },
          {
            player1: { id: '5', name: 'Competitor 3-3', winner: false },
            player2: { id: '8', name: 'Competitor 3-4', winner: true }
          },
          {
            player1: { id: '1', name: 'Competitor 3-5', winner: false },
            player2: { id: '4', name: 'Competitor 3-6', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 3-7', winner: false },
            player2: { id: '5', name: 'Competitor 3-8', winner: false }
          }
        ]
      },
      {
        games: [
          {
            player1: { id: '1', name: 'Competitor 4-1', winner: false },
            player2: { id: '4', name: 'Competitor 4-2', winner: true }
          },
          {
            player1: { id: '5', name: 'Competitor 4-3', winner: true },
            player2: { id: '1', name: 'Competitor 4-4', winner: false }
          }
        ]
      },
      {
        games: [
          {
            player1: { id: '5', name: 'Competitor 5-1', winner: true },
            player2: { id: '1', name: 'Competitor 5-2', winner: false }
          }
        ]
      }
    ]
  }
}
</script>
