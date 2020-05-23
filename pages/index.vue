<template>
  <div class="container">
    <img class="logo" src="~/assets/logo_verticalpink.png" width="200px">
    <h2 class="subtitle">
      トーナメントで優勝を決める
    </h2>
    <Button label="ログイン" :on-click="twitterLogin" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import User from '../models/User'
import Button from '~/components/Button.vue'

const UserStore = namespace('users')

@Component({
  middleware: ({ store, redirect }) => {
    const user = store.getters['users/user']
    if (user) {
      return redirect(`/user/${user.id}`)
    }
  },
  components: {
    Button
  }
})
export default class Index extends Vue {
  @UserStore.Action('login')
  login!: () => void

  @UserStore.Getter('user')
  user!: User

  async twitterLogin () {
    try {
      await this.login()
      this.$router.push(`/user/${this.user.id}`)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  margin-bottom: 30px;
}

.subtitle {
  font-size: 1.5em;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
