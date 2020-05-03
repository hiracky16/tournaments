<template>
  <TournamentIndexTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentIndexTemplate from '~/components/templates/tournament/_id/TournamentIndexTemplate.vue'
import FirestoreTournament from '@/models/FirestoreTournament'

const TournamentStore = namespace('tournaments')

@Component({
  components: { TournamentIndexTemplate }
})
export default class TournamentDetail extends Vue {
  @TournamentStore.Getter('tournament')
  tournament!: FirestoreTournament

  get rounds () {
    return this.tournament.generateRounds()
  }
}
</script>
