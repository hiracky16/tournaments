<template>
  <div>
    <header class="container">
      <nuxt-link :to="link">
        <img src="~/assets/logo_sidepink.png" width="150px">
      </nuxt-link>
      <nav>
        <ul @click="clickNav">
          <li>{{ navText }}</li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import User from '@/models/User'
const UserStore = namespace('users')

@Component({})
export default class Header extends Vue {
  @UserStore.Getter('isLogin')
  isLogin!: boolean

  @UserStore.Getter('user')
  user!: User

  @UserStore.Action('logout')
  logout!: () => void

  @UserStore.Action('login')
  login!: () => void

  get navText () {
    return this.isLogin ? 'ログアウト' : 'ログイン'
  }

  get link () {
    return this.isLogin ? `/user/${this.user.id}` : '/'
  }

  async clickNav () {
    if (this.isLogin) {
      await this.logout()
      this.$router.push('/')
    } else {
      await this.login()
      this.$router.push(`/user/${this.user.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
  h1 {
    color: #858585;
    font-size: 2em;
    a {
      color: #333;
    }
  }
}

nav {
  margin-left: auto;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      list-style-type: none;
      margin-left: 15px;
      a {
        color: #333;
      }
    }
  }
}
</style>
