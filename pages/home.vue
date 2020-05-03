<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="user.image" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ user.name }}
                </p>
                <p class="subtitle is-6">
                  @johnsmith
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container" id="buttonclass">
        <button class="button is-primary is-medium" @click="toTournamentList">
          新しいトーナメントを探す
        </button>
      </div>
    </section>
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
import User from '~/models/User.ts'

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
export default class Home extends Vue {
  @TournamentStore.Getter('tournaments')
  tournaments!: { [key: string]: string }[]

  @TournamentStore.Action('fetchTournament')
  fetchTournament!: (id: string) => void

  @UserStore.Action('logout')
  logout!: () => void

  @UserStore.Action('tweet')
  tweet!: () => void

  @UserStore.Getter('user')
  user!: User

  toTournamentList () {
    this.$router.push('tournaments')
  }

  async twitterLogout () {
    await this.logout()
    this.$router.push('/')
  }

  async clickTweetButton () {
    await this.tweet()
  }

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

#buttonclass {
  text-align: center;
  display: block;
}
</style>
