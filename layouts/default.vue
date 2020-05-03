<template>
  <div class="app-container">
    <Header class="app-header" />
    <main class="app-main container">
      <nuxt />
    </main>
    <Footer class="app-footer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'

@Component({
  components: { Header, Footer }
})
export default class Layout extends Vue {
}

</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #fcd7cd 0%, #f8cff8 100%);
  background-size: cover;
}

html, body, #__nuxt, #__layout {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #21d4b9;
  color: #21d4b9;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #21d4b9;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-header {
  margin-bottom: 30px;
}

.app-footer {
  padding-top: 30px;
  margin-top: auto;
}
</style>
