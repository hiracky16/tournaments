<template>
  <TournamentEditTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentEditTemplate from '~/components/templates/tournament/_id/TournamentEditTemplate.vue'
import { Game } from '~/models/tournament'
import { sampleRounds } from '~/tmp/sample_rounds'

const RoundStore = namespace('rounds')

@Component({
  components: { TournamentEditTemplate },
  fetch ({ store }) {
    store.dispatch('rounds/setInitialRounds', sampleRounds)
  }
})
export default class TournamentEdit extends Vue {
  @RoundStore.Getter('rounds')
  rounds!: { games: Game[] }[]

  mounted () {
    console.log(this.rounds)
  }
}
</script>
