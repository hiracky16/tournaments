<template>
  <div>
    <header>
      <nuxt-link to="/">
        <h1>
          <img src="~/assets/logo.png" width="200px">
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
  color: #fff;
  padding: 20px;
  background-color: #527b8e;
  h1 {
    color: #fff;
    a {
      color: #fff;
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
