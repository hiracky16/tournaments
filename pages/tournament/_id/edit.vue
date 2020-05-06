<template>
  <TournamentEditTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentEditTemplate from '~/components/templates/tournament/_id/TournamentEditTemplate.vue'

const RoundStore = namespace('rounds')

@Component({
  components: { TournamentEditTemplate },
  fetch ({ store, params }) {
    store.dispatch('rounds/fetchUserTournament', params.id)
  }
})
export default class TournamentEdit extends Vue {
  @RoundStore.Getter('userTournament')
  tournament!: any

  get rounds () {
    return this.tournament.rounds
  }
}
</script>
