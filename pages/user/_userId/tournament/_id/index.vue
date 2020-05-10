<template>
  <TournamentIndexTemplate
    :rounds="rounds"
    :is-own="isOwn"
    :user="user"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentIndexTemplate from '~/components/templates/tournament/_id/TournamentIndexTemplate.vue'
import User from '@/models/User'

const RoundStore = namespace('rounds')
const UserStore = namespace('users')

@Component({
  components: { TournamentIndexTemplate },
  async fetch ({ store, params }) {
    await store.dispatch('rounds/fetchUserTournament', params)
  }
})
export default class TournamentDetail extends Vue {
  // FIXME: type
  @RoundStore.Getter('userTournament')
  tournament!: any

  @RoundStore.Getter('isOwn')
  isOwn!: boolean

  @UserStore.Getter('user')
  user!: User

  get rounds () {
    return this.tournament?.rounds
  }
}
</script>
