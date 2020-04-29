<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">メールアドレス</label>
            <div class="control">
              <input
                class="input"
                type="mail"
                placeholder="email@example.com"
                @change="changeEmail"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">パスワード</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="password"
                @change="changePassword"
              >
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-primary is-fullwidth" @click="buttonAction">
          {{ buttonText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'

@Component({})
export default class Login extends Vue {
  private email = ''
  private password = ''
  private message = ''

  get isSignIn () {
    return this.$route.query.mode === 'signin'
  }

  get buttonText () {
    return this.isSignIn ? '登録' : 'ログイン'
  }

  buttonAction () {
    this.isSignIn ? this.signIn() : this.logIn()
  }

  signIn () {
    this.$nuxt.$loading.start()
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$nuxt.$loading.finish()
        this.$router.push('user')
      })
  }

  logIn () {
    this.$nuxt.$loading.start()
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((res: any) => {
        console.log(res)
        this.$nuxt.$loading.finish()
        this.$router.push('user')
      })
  }

  changeEmail (event: InputEvent) {
    this.email = (event.target as HTMLInputElement).value
  }

  changePassword (event: InputEvent) {
    const password = (event.target as HTMLInputElement).value
    if (password.length < 6) {
      this.message = 'パスワードが短すぎます'
    }
    this.password = password
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 32px;
}
</style>
