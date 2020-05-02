<template>
  <div class="card TournamentLayout__list">
    <div class="TournamentLayout__block _wrap">
      <TournamentGame :game="rounds.slice(-1)[0].games[0]" class="TournamentLayout__game" />
      <div class="TournamentLayout__prev-block">
        <div
          v-for="(game_r2, i2) in rounds.slice(-2)[0].games"
          :key="`round-2_${i2}`"
          class="TournamentLayout__block"
        >
          <TournamentGame :game="game_r2" class="TournamentLayout__game" />
          <div class="TournamentLayout__prev-block">
            <div
              v-for="(game_r3, i3) in rounds.slice(-3)[0].games.slice(i2 * 2, ((i2 * 2) + 2))"
              :key="`round-3_${i3}`"
              class="TournamentLayout__block"
            >
              <TournamentGame :game="game_r3" class="TournamentLayout__game" />
              <div class="TournamentLayout__prev-block">
                <div
                  v-for="(game_r4, i4) in rounds.slice(-4)[0].games.slice(((i2 * 4) + (i3 * 2)), ((i2 * 4) + (i3 * 2)) + 2)"
                  :key="`round-4_${i4}`"
                  class="TournamentLayout__block"
                >
                  <TournamentGame :game="game_r4" class="TournamentLayout__game" />
                  <div class="TournamentLayout__prev-block">
                    <div
                      v-for="(game_r5, i5) in rounds.slice(-5)[0].games.slice(((i2 * 8) + (i3 * 4)) + (i4 * 2), ((i2 * 8) + (i3 * 4)) + (i4 * 2) + 2)"
                      :key="`round-5_${i5}`"
                      class="TournamentLayout__block"
                    >
                      <TournamentGame :game="game_r5" class="TournamentLayout__game" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TournamentGame from '~/components/TournamentGame.vue'
import { Game } from '~/models/tournament'

@Component({
  components: { TournamentGame }
})
export default class TournamentLayout extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  rounds!: {
    games: Game[]
  }[];
}
</script>

<style lang="scss" scoped>
.TournamentLayout {
  &__list {
    display: flex;
    align-items: stretch;
    padding: 40px;
  }
  &__prev-block {
    margin-right: 60px;
  }
  &__block {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background-color: #999;
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
    }
    &:after {
      content: "";
      display: block;
      width: 2px;
      height: calc(50% + 22px);
      background: #999;
      position: absolute;
      left: calc(100% + 28px);
      top: 50%;
    }
    &:last-child {
      margin-bottom: 0;
      &:after {
        transform: translateY(-100%);
      }
    }
    &._wrap:before, &._wrap:after {
      content: none;
    }
  }
  &__game {
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background-color: #999;
      position: absolute;
      right: calc(100% + 10px);
      top: 50%;
    }
    &:last-child {
      &::before {
        content: none;
      }
    }
  }
}
</style>
