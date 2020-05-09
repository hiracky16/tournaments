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
                  <a :href="twitterLink" target="_blank">
                    @{{ user.twitterId }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div id="buttonclass" class="container">
        <button class="button is-primary is-medium" @click="toTournamentList">
          新しいトーナメントを作成
        </button>
        <button class="button is-primary is-medium" @click="clickTweetButton">
          ツイート
        </button>
      </div>
    </section>
    <TournamentList
      :tournaments="userTournaments"
      @click="clickTournament"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentList from '~/components/TournamentList.vue'
import User, { UserTournament } from '~/models/User.ts'

const UserStore = namespace('users')

@Component({
  components: {
    TournamentList
  },
  middleware: 'auth',
  fetch ({ store }) {
    store.dispatch('users/fetchUserTournaments')
  }
})
export default class Home extends Vue {
  @UserStore.Getter('userTournaments')
  userTournaments!: UserTournament[]

  @UserStore.Action('logout')
  logout!: () => void

  @UserStore.Action('tweet')
  tweet!: (text: string) => void

  @UserStore.Getter('user')
  user!: User

  get twitterLink () {
    return `https://twitter.com/${this.user.twitterId}`
  }

  toTournamentList () {
    this.$router.push('tournaments')
  }

  async twitterLogout () {
    await this.logout()
    this.$router.push('/')
  }

  async clickTweetButton () {
    await this.tweet('今日は寒い')
  }

  async clickTournament (event: string) {
    // TODO
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
