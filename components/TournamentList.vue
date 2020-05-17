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
            @click="clickAction(tournament)"
          >
            {{ tournament.name }}
            <div class="createdAt">
              {{ tournamentCreatedAt(tournament) }}
            </div>
          </div>
        </div>
      </nav>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import { Timestamp } from '@google-cloud/firestore'

type TournamentType = {
  id: string | number
  name: string
  createdAt?: Timestamp | null
}

@Component({})
export default class Tournament extends Vue {
  @Prop({ type: Array, required: true })
  tournaments!: TournamentType[]

  @Emit('click')
  clickAction (tournament: TournamentType) {
    return tournament
  }

  tournamentCreatedAt (tournament: TournamentType) {
    if (!tournament.createdAt) {
      return ''
    } else {
      const date = tournament.createdAt.toDate()
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日作成`
    }
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
  display: block;
  .createdAt {
    margin-right: 8px;
    float: right;
  }
}
</style>
