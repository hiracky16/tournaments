<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="panel">
          <p class="panel-heading">
            トーナメント一覧
          </p>
          <div
            v-for="tournament in tournaments"
            :key="tournament.id"
          >
            <nuxt-link class="panel-block" :to="`tournament/${tournament.id}`">
              {{ tournament.name }}
            </nuxt-link>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Tournament extends Vue {
  @Prop({ type: Object, required: true })
  tournaments!: { [key: string]: string }[]
}
</script>

<style lang="scss" scoped>
.Tournament {
  .Tournament_Search {
    display: block;
  }
  .Trournaments_Table {
    display: block;
  }
}
</style>
