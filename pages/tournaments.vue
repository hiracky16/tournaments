<template>
  <div class="container">
    <TournamentList
      :tournaments="tournaments"
      @click="clickTournament"
    />
    <div :class="{ 'is-active': isModal }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ selectedTournamentName }}
          </p>
          <button class="delete" aria-label="close" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          トーナメントを作成しますか？
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="moveTournamentPage">
            作成
          </button>
          <button class="button" @click="closeModal">
            キャンセル
          </button>
        </footer>
      </div>
    </div>
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
  private isModal = false
  private selectedTournamentId = ''
  private selectedTournamentName = ''

  @TournamentStore.Getter('tournaments')
  tournaments!: FirestoreTournament[]

  @UserStore.Getter('user')
  user!: User

  @TournamentStore.Action('fetchAndRegisterTournament')
  fetchAndRegisterTournament!: (data: {id: string, userId: string}) => void

  closeModal () {
    this.isModal = false
    this.selectedTournamentId = ''
    this.selectedTournamentName = ''
  }

  clickTournament (event: any) {
    this.isModal = true
    this.selectedTournamentId = event.id
    this.selectedTournamentName = event.name
  }

  async moveTournamentPage () {
    const id = await this.fetchAndRegisterTournament({ id: this.selectedTournamentId, userId: this.user.id })
    this.$router.push(`tournament/${id}`)
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
