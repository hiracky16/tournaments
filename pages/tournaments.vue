<template>
  <div>
    <TournamentList :tournaments="tournaments" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'
import TournamentList from '~/components/TournamentList.vue'

const TournamentStore = namespace('tournaments')

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
