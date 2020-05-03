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
import FirestoreTournament from '~/models/FirestoreTournament'
import User from '~/models/User'

const TournamentStore = namespace('tournaments')
const UserStore = namespace('users')

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
  tournaments!: FirestoreTournament[]

  @UserStore.Getter('user')
  user!: User

  @TournamentStore.Action('fetchAndRegisterTournament')
  fetchAndRegisterTournament!: (data: {id: string, userId: string}) => void

  async clickTournament (event: string) {
    await this.fetchAndRegisterTournament({ id: event, userId: this.user.id })
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
