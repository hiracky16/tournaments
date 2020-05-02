<template>
  <div>
    <header class="container">
      <nuxt-link to="/">
        <h1>
          <!-- <img src="~/assets/logo.png" width="200px"> -->
          Idol Tournament
        </h1>
      </nuxt-link>
      <nav>
        <ul>
          <!-- TODO: isLoginで切り替え -->
          <li v-if="true">
            <nuxt-link to="/login">
              ログイン
            </nuxt-link>
          </li>
          <li v-if="false">
            <nuxt-link to="/logout">
              ログアウト
            </nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link to="/tournament">
              トーナメント
            </nuxt-link>
          </li> -->
        </ul>
      </nav>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
header {
  padding: 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
  h1 {
    color: #858585;
    font-size: 32px;
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
