<template>
  <div class="container">
    <template>
      <h1 class="finmessage">
        トーナメントの編集が完了しました。
      </h1>
      <div class="tournaments">
        <h2>
          {{ name }}
        </h2>
      </div>
      <nuxt-link to="/home" class="button is-primary is-medium">
        ホームに戻る
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'

const RoundStore = namespace('rounds')

@Component({
  async fetch ({ store, params }) {
    await store.dispatch('rounds/fetchUserTournament', params.id)
  }
})
export default class Home extends Vue {
  @RoundStore.Getter('userTournament')
  tournament!: any

  get name () {
    return this.tournament?.name
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: block;
}

.finmessage {
  font-size: 60px;
  line-height: 100px;
  float: center;
}

.tournaments {
  font-size: 30px;
  line-height: 100px;
  float: center;
}

</style>
