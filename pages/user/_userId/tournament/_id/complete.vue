<template>
  <div>
    <h1 class="finmessage">
      トーナメントの編集が完了しました。
    </h1>
    <div class="tournaments">
      <h2>
        {{ name }}
      </h2>
    </div>
    <button @click="tweet">
      このトーナメントの結果をシェアする
    </button>
    <div class="CompleteCapture__container">
      <div id="capture" class="CompleteCapture__frame">
        <TournamentLayout :rounds="tournament.rounds" :is-editable="false" class="CompleteCapture__tournament" />
      </div>
    </div>
    <nuxt-link :to="`/user/${$route.params.userId}`" class="button is-primary is-medium">
      ホームに戻る
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import html2canvas from 'html2canvas'
import TournamentLayout from '~/components/TournamentLayout.vue'
import User from '@/models/User'
// FIXME: 一旦ハードコーディングしているが環境変数に逃がす
const DOMAIN = 'https://akbtest-66d57.web.app'

const RoundStore = namespace('rounds')
const UserStore = namespace('users')

@Component({
  components: { TournamentLayout },
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
export default class Home extends Vue {
  @RoundStore.Getter('userTournament')
  tournament!: any

  @RoundStore.Action('uploadImage')
  uploadImage!: (image: any) => void

  @UserStore.Getter('user')
  user!: User

  get name () {
    return this.tournament?.name
  }

  async tweet () {
    this.$nuxt.$loading.start()
    try {
      const canvas: HTMLCanvasElement = await html2canvas(document.getElementById('capture')!)
      const ctx = canvas.getContext('2d')
      const img = new Image()
      ctx!.drawImage(img, 0, 0)
      const base64 = canvas.toDataURL('image/jpeg')
      await this.uploadImage({ tournamentId: this.$route.params.id, base64 })
      const tweetText = `#uniqa #${this.tournament.name}\n ${this.shareUrl()}`
      await this.user.tweet(tweetText)
    } catch (error) {
      console.log(error)
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  shareUrl () {
    return `${DOMAIN}/ogp/user/${this.$route.params.userId}/tournament/${this.$route.params.id}`
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: block;
}

.finmessage {
  font-size: 60px;
  line-height: 100px;
  float: center;
}

.tournaments {
  font-size: 30px;
  line-height: 100px;
  float: center;
}

.CompleteCapture {
  &__container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-height: 700px;
    @media screen and (max-width: 768px) {
      max-height: 620px;
    }
  }
  &__frame {
    width: 250%;
    max-width: 1260px;
    transform: scale(.4);
    transform-origin: top center;
    background: #fff;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 340%;
      max-width: 975px;
      transform: scale(0.34);
    }
  }
  &__tournament {
    overflow: visible;
  }
}
</style>
