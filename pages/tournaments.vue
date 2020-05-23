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
          <div class="warning-label">
            ※{{ selectedArtistName }}の全楽曲から32曲をランダムで抽出し、
            トーナメントを行います。
          </div>
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
  private selectedArtistName = ''
  

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
    this.selectedArtistName = this.selectedTournamentName.replace("のトーナメント", "")
    console.log(this.selectedArtistName)
  }

  async moveTournamentPage () {
    const userId = this.user.id
    const id = await this.fetchAndRegisterTournament({ id: this.selectedTournamentId, userId })
    this.$router.push(`user/${userId}/tournament/${id}`)
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

.warning-label {
  color: red
}
</style>
