<template>
  <TournamentEditTemplate :rounds="rounds" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentEditTemplate from '~/components/templates/tournament/_id/TournamentEditTemplate.vue'

const RoundStore = namespace('rounds')

@Component({
  components: { TournamentEditTemplate },
  middleware: ({ store, redirect, params }) => {
    const myUserId = store.getters['users/user']?.id
    if (myUserId !== params.userId) {
      return redirect(`/user/${myUserId}`)
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('rounds/fetchUserTournament', params)
  }
})
export default class TournamentEdit extends Vue {
  @RoundStore.Getter('userTournament')
  tournament!: any

  get rounds () {
    return this.tournament?.rounds
  }
}
</script>
