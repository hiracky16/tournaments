<template>
  <div>
    <input
      type="file"
      accept="image/png,image/jpeg,image/gif"
      @change="upload"
    >
    <img :src="url">
    <TournamentIndexTemplate
      :rounds="rounds"
      :is-own="isOwn"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import TournamentIndexTemplate from '~/components/templates/tournament/_id/TournamentIndexTemplate.vue'
import User from '@/models/User'

const RoundStore = namespace('rounds')
const UserStore = namespace('users')

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

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

  @RoundStore.Action('uploadImage')
  uploadImage!: (image: any) => void

  @RoundStore.Getter('imageUrl')
  url!: string

  get rounds () {
    return this.tournament?.rounds
  }

  async upload (e?: HTMLInputEvent) {
    if (e?.target?.files?.length === 0) {
      return
    }
    const image = e?.target?.files[0]
    await this.uploadImage(image)
  }
}
</script>
