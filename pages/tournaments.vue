<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="panel">
          <p class="panel-heading">
            トーナメント一覧
          </p>
          <div
            v-for="tournament in tournaments"
            :key="tournament.id"
          >
            <a class="panel-block">
              {{ tournament.name }}
            </a>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'

const TournamentStore = namespace('tournaments')

@Component({
  components: {},
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
export default class Tournament extends Vue {
  @TournamentStore.Getter('tournaments')
  tournaments!: Tournament[]
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
