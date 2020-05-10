<template>
  <TournamentIndexTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentIndexTemplate from '~/components/templates/tournament/_id/TournamentIndexTemplate.vue'

const RoundStore = namespace('rounds')

@Component({
  components: { TournamentIndexTemplate },
  async fetch ({ store, params }) {
    await store.dispatch('rounds/fetchUserTournament', params.id)
  }
})
export default class TournamentDetail extends Vue {
  // FIXME: type
  @RoundStore.Getter('userTournament')
  tournament!: any

  get rounds () {
    return this.tournament?.rounds
  }
}
</script>
