<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="image" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ name }}
                </p>
                <p class="subtitle is-6">
                  @johnsmith
                </p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <button class="button is-primary is-medium" @click="toTournamentList">
          新しいトーナメントを探す
        </button>
        <button class="button is-primary is-medium" @click="twitterLogout">
          ログアウト
        </button>
      </div>
    </section>
    <TournamentList :tournaments="tournaments" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'
import TournamentList from '~/components/TournamentList.vue'

const TournamentStore = namespace('tournaments')
const UserStore = namespace('users')

@Component({
  components: {
    TournamentList
  },
  async fetch ({ store }) {
    const tournaments: { [key: string]: string }[] = []
    await firebase
      .firestore()
      .collection('tournaments')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tournaments.push({ id: doc.id, name: doc.data()?.name })
        })
      })
    store.dispatch('tournaments/setTournaments', tournaments)
  }
})
export default class TournamentsPage extends Vue {
  @TournamentStore.Getter('tournaments')
  tournaments!: { [key: string]: string }[]

  @UserStore.Action('logout')
  logout!: () => void

  @UserStore.Getter('name')
  name!: string

  @UserStore.Getter('image')
  image!: string

  toTournamentList () {
    this.$router.push('tournaments')
  }

  async twitterLogout () {
    await this.logout()
    this.$router.push('/')
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
