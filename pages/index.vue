<template>
  <div class="container">
    <div>
      <h1 class="title">
        アイドルトーナメント（仮）
      </h1>
      <h2 class="subtitle">
        トーナメント形式で一番を決める
      </h2>
      <button
        class="button is-primary"
        @click="twitterLogin"
      >
        ログイン
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'

const UserStore = namespace('users')

@Component({})
export default class Index extends Vue {
  @UserStore.Action('login')
  login!: () => void

  async twitterLogin () {
    try {
      console.log('test')
      await this.login()
    } catch (error) {
      console.log(error)
    } finally {
      this.$router.push('home')
    }
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 6em;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2.5em;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
