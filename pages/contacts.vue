<template>
  <div class="container">
    <h1 class="title">
      お問い合わせページ
    </h1>
    <Message class="successMessage" :is-display="isSuccess" display-message="お問い合わせが完了しました。" />
    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="answer" value="feature" @change="clickRadioButton">
          機能追加要望
        </label>
        <label class="radio">
          <input type="radio" name="answer" value="addtournaments" @change="clickRadioButton">
          トーナメント追加要望
        </label>
        <label class="radio">
          <input type="radio" name="answer" value="bug" @change="clickRadioButton">
          バグ改善要望
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="text" class="input" placeholder="タイトル" @input="inputTitle">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="内容(任意)" @input="inputContent" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <Button v-if="!isSuccess" label="送信" :on-click="submit" :disabled="!canSubmit" />
        <nuxt-link
          v-if="isSuccess"
          :to="`/user/${$route.params.userId}`"
        >
          ホームに戻る
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import Message from '@/components/Message.vue'
import Button from '@/components/Button.vue'
import User from '~/models/User'
import firebase from '@/plugins/firebase'
const UserStore = namespace('users')

@Component({
  components: { Message, Button }
})
export default class ContactPage extends Vue {
  private radioButtonValue = ''
  private title = ''
  private content = ''
  private isSuccess = false

  @UserStore.Getter('user')
  user!: User

  get canSubmit () {
    return this.radioButtonValue !== '' && this.title !== ''
  }

  clickRadioButton (element: Event) {
    this.radioButtonValue = (element?.target as any)?.value
  }

  inputTitle (element: InputEvent) {
    this.title = (element?.target as any)?.value
  }

  inputContent (element: InputEvent) {
    this.content = (element?.target as any)?.value
  }

  async submit () {
    this.$nuxt.$loading.start()
    const res = confirm('送信しますか？')
    if (res) {
      await this.registerContact()
      this.isSuccess = true
    } else {
      // do nothing ...
    }
    this.$nuxt.$loading.finish()
  }

  // TODO: 外だし
  async registerContact () {
    await firebase
      .firestore()
      .collection('contacts')
      .doc()
      .set({
        userId: this.user.id,
        type: this.radioButtonValue,
        title: this.title,
        content: this.content
      })
  }
}
</script>

<style lang="scss" scoped>
.successMessage {
  margin-bottom: 16px;
}
</style>
