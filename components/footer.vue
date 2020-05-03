<template>
  <div>
    <footer><small>&copy; Idol Tournaments all rights reserved.</small></footer>
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
  text-align: center;
  padding: 20px;
  font-size: .75em;
}
</style>
