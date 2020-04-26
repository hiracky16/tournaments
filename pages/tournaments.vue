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
import { Component } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'

@Component({
  components: {},
  async asyncData ({ params }) {
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
    return { tournaments }
  }
})
export default class Tournament extends Vue {
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
