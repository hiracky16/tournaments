<template>
  <div class="container">
    <h1 class="finmessage">
      トーナメントの編集が完了しました。
    </h1>
    <div class="tournaments">
      <h2>
        {{ name }}
      </h2>
    </div>
    <button class="button is-primary is-medium" @click="clickShareButton">
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
    <div :class="{ 'is-active': isModal }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            結果をシェアする
          </p>
          <button class="delete" aria-label="close" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              結果をシェアしますか？<br>
              このトーナメントを最大3人に回すことができます。<br>
              <span style="color: red">※ 回す場合はTwitterのアカウントIDを記入してください。</span>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" :value="account1" @input="changeAccout1">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" :value="account2" @input="changeAccout2">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" :value="account3" @input="changeAccout3">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="tweet">
            ツイート
          </button>
          <button class="button" @click="closeModal">
            キャンセル
          </button>
        </footer>
      </div>
    </div>
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

const ACCOUNT_PREFIX = '@'

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

  private isModal = false
  private account1 = ACCOUNT_PREFIX
  private account2 = ACCOUNT_PREFIX
  private account3 = ACCOUNT_PREFIX

  get name () {
    return this.tournament?.name
  }

  clickShareButton () {
    this.isModal = true
  }

  init () {
    this.account1 = ACCOUNT_PREFIX
    this.account2 = ACCOUNT_PREFIX
    this.account3 = ACCOUNT_PREFIX
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
      const shareText = `${this.name}の結果%0aトーナメントで遊びませんか？%0a${this.shareAccounts()}%0a`
      const tweetUrl = `http://twitter.com/share?url=${this.shareUrl()}&hashtags=${this.shareHashTags()}&text=${shareText}`
      window.open(tweetUrl, '_blank')
    } catch (error) {
      console.log(error)
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  shareUrl () {
    return `${DOMAIN}/ogp/user/${this.$route.params.userId}/tournament/${this.$route.params.id}`
  }

  shareHashTags () {
    const artistName = this.tournament.name?.replace('のトーナメント', '')
    const list = [
      'Uniqa',
      this.name,
      artistName,
      'おうち時間'
    ]
    return list.join(',')
  }

  shareAccounts () {
    const accounts = []
    if (this.account1.slice(0, 1) === ACCOUNT_PREFIX && this.account1.length >= 2) {
      accounts.push(this.account1)
    }
    if (this.account2.slice(0, 1) === ACCOUNT_PREFIX && this.account2.length >= 2) {
      accounts.push(this.account2)
    }
    if (this.account3.slice(0, 1) === ACCOUNT_PREFIX && this.account3.length >= 2) {
      accounts.push(this.account3)
    }
    return accounts.join(' ')
  }

  closeModal () {
    this.init()
    this.isModal = false
  }

  // FIXME: 可変にしたほうが良かったかも
  changeAccout1 (element: InputEvent) {
    this.account1 = (element?.target as any)?.value
  }

  changeAccout2 (element: InputEvent) {
    this.account2 = (element?.target as any)?.value
  }

  changeAccout3 (element: InputEvent) {
    this.account3 = (element?.target as any)?.value
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
    display: none;
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
