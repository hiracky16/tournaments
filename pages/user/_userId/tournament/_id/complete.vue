<template>
  <div class="container">
    <h1 class="finmessage">
      トーナメントの編集が完了しました。
    </h1>
    <Button label="結果をツイートする" :on-click="clickShareButton" class="shareButton" />
    <div class="tournaments">
      <h2>
        {{ name }}
      </h2>
    </div>
    <div class="CompleteCapture__container">
      <div id="capture" class="CompleteCapture__frame">
        <TournamentLayout :rounds="tournament.rounds" :is-editable="false" class="CompleteCapture__tournament" />
      </div>
    </div>
    <div :class="{ 'is-active': isModal }" class="modal">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            結果をツイートする
          </p>
          <button class="delete" aria-label="close" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              結果をツイートしますか？<br>
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
          <div class="field">
            <div class="control">
              トーナメント結果
            </div>
          </div>
          <div id="tournamentImage" />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="tweet">
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
import Button from '~/components/Button.vue'
import User from '@/models/User'
// FIXME: 一旦ハードコーディングしているが環境変数に逃がす
const DOMAIN = 'https://www.uniqa.site'

const ACCOUNT_PREFIX = '@'

const RoundStore = namespace('rounds')
const UserStore = namespace('users')

@Component({
  components: { TournamentLayout, Button },
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
  private tournamentBase64 = ''

  get name () {
    return this.tournament?.name
  }

  async clickShareButton () {
    this.isModal = true
    // FIXME: クソ実装
    const canvas = await html2canvas(document.getElementById('capture')!)
    const ctx = canvas.getContext('2d')
    const img = new Image()
    ctx!.drawImage(img, 0, 0)
    const tmp = document.getElementById('tournamentImage')?.appendChild(canvas)
    this.tournamentBase64 = canvas.toDataURL('image/jpeg')
  }

  init () {
    this.account1 = ACCOUNT_PREFIX
    this.account2 = ACCOUNT_PREFIX
    this.account3 = ACCOUNT_PREFIX
  }

  async tweet () {
    this.$nuxt.$loading.start()
    try {
      await this.uploadImage({ tournamentId: this.$route.params.id, base64: this.tournamentBase64 })
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
  font-size: 40px;
  line-height: 100px;
  float: center;
}

.shareButton {
  margin: 20px 0 40px;
}

.tournaments {
  margin-bottom: 16px;
}

.CompleteCapture {
  &__container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 40px;
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

.toHome {
  color: #666;
  transition: all .1s ease;
  &:hover {
    text-decoration: underline;
    color: #f5576c;
  }
}
</style>
