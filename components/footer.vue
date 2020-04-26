<template>
  <div>
    <footer>footer</footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
footer {
  color: #fff;
  padding: 20px;
  background-color: #2b4257;
  font-size: 30px;
  font-weight: bold;
}
</style>
