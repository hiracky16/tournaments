<template>
  <div>
    <header class="container">
      <nuxt-link to="/">
          <img src="~/assets/logo_sidepink.png" width="150px">
      </nuxt-link>
      <nav>
        <ul>
          <li v-if="!isLogin">
            ログイン
          </li>
          <li v-if="isLogin">
            <div @clikc="logoutTwitter">
              ログアウト
            </div>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'

const UserStore = namespace('users')

@Component({})
export default class Header extends Vue {
  @UserStore.Getter('isLogin')
  isLogin!: boolean

  @UserStore.Action('logout')
  logout!: () => void

  async logoutTwitter () {
    await this.logout()
    this.$router.push('/')
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
