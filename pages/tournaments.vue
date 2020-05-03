<template>
  <div>
    <TournamentList
      :tournaments="tournaments"
      @click="clickTournament"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentList from '~/components/TournamentList.vue'

const TournamentStore = namespace('tournaments')

@Component({
  components: {
    TournamentList
  },
  fetch ({ store }) {
    store.dispatch('tournaments/fetchTournaments')
  }
})
export default class TournamentsPage extends Vue {
  @TournamentStore.Getter('tournaments')
  tournaments!: { [key: string]: string }[]

  @TournamentStore.Action('fetchTournament')
  fetchTournament!: (id: string) => void

  async clickTournament (event: string) {
    await this.fetchTournament(event)
    this.$router.push(`tournament/${event}`)
  }
}
</script>

<style lang="scss" scoped>
.Tournament {
  .Tournament_Search {
    display: block;
  }
  .Trournaments_Table {
    display: block;
  }
}
</style>
