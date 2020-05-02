<!--
プラグイン使用ver 廃止
落ち着いたらファイルごと消す
-->

<template>
  <div class="card">
    <client-only placeholder="Loading...">
      <bracket :rounds="rounds">
        <template #player="{ player }">
          {{ player.name }}
        </template>
      </bracket>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class TournamentCard extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  rounds!: { [key: string]: string }[]
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
}
</style>
