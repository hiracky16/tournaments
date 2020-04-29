<template>
  <div>
    <header>
      <nuxt-link to="/">
        <h1>
          <!-- <img src="~/assets/logo.png" width="200px"> -->
          Idol Tournament
        </h1>
      </nuxt-link>
      <nav>
        <!-- <ul>
          <li>
            <nuxt-link to="/login">
              ログイン
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/tournament">
              トーナメント
            </nuxt-link>
          </li>
        </ul> -->
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
  padding: 20px;
  text-align: center;
  h1 {
    color: #858585;
    font-size: 32px;
    a {
      color: #333;
    }
  }
}

nav {
  color: #fff;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      list-style-type: none;
      margin-left: 15px;
      a {
        color: #fff;
      }
    }
  }
}
</style>
