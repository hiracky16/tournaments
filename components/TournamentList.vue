<template>
  <div>
    <section>
      <nav class="panel">
        <p class="panel-heading">
          トーナメント一覧
        </p>
        <div
          v-for="tournament in tournaments"
          :key="tournament.id"
        >
          <div
            class="panel-block"
            @click="clickAction(tournament.id)"
          >
            {{ tournament.name }}
          </div>
        </div>
      </nav>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'

@Component({})
export default class Tournament extends Vue {
  @Prop({ type: Object, required: true })
  tournaments!: { [key: string]: string }[]

  @Emit('click')
  clickAction (id: string) {
    return id
  }
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
.panel-block {
  background-color: #fff;
}
</style>
