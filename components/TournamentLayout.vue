<template>
  <div class="TournamentLayout__list">
    <div class="TournamentLayout__block _wrap">
      <TournamentGame
        :game-idx="0"
        :round-idx="0"
        :game="rounds.slice(-1)[0].games[0]"
        class="TournamentLayout__game"
      />
      <div class="TournamentLayout__prev-block">
        <div
          v-for="(game_r2, i2) in rounds.slice(-2)[0].games"
          :key="`round-2_${i2}`"
          class="TournamentLayout__block"
        >
          <TournamentGame
            :game-idx="i2"
            :round-idx="1"
            :game="game_r2"
            class="TournamentLayout__game"
          />
          <div class="TournamentLayout__prev-block">
            <div
              v-for="(game_r3, i3) in rounds.slice(-3)[0].games.slice(i2 * 2, ((i2 * 2) + 2))"
              :key="`round-3_${i3}`"
              class="TournamentLayout__block"
            >
              <TournamentGame
                :game-idx="(i2 * 2) + i3"
                :round-idx="2"
                :game="game_r3"
                class="TournamentLayout__game"
              />
              <div class="TournamentLayout__prev-block">
                <div
                  v-for="(game_r4, i4) in rounds.slice(-4)[0].games.slice((i2 * 4) + (i3 * 2), ((i2 * 4) + (i3 * 2)) + 2)"
                  :key="`round-4_${i4}`"
                  class="TournamentLayout__block"
                >
                  <TournamentGame
                    :game-idx="(i2 * 4) + (i3 * 2) + i4"
                    :round-idx="3"
                    :game="game_r4"
                    class="TournamentLayout__game"
                  />
                  <div class="TournamentLayout__prev-block">
                    <div
                      v-for="(game_r5, i5) in rounds.slice(-5)[0].games.slice((i2 * 8) + (i3 * 4) + (i4 * 2), ((i2 * 8) + (i3 * 4)) + (i4 * 2) + 2)"
                      :key="`round-5_${i5}`"
                      class="TournamentLayout__block"
                    >
                      <TournamentGame
                        :game-idx="(i2 * 8) + (i3 * 4) + (i4 * 2) + i5"
                        :round-idx="4"
                        :game="game_r5"
                        class="TournamentLayout__game"
                      />
                    </div>
                  </div>
                  <!-- r5 -->
                </div>
              </div>
              <!-- r4 -->
            </div>
          </div>
          <!-- r3 -->
        </div>
      </div>
      <!-- r2 -->
    </div>
    <!-- _wrap -->
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
    type: Array,
    required: true
  })
  rounds!: {
    games: Game[]
  }[];

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  isEditable!: boolean
}
</script>

<style lang="scss" scoped>
.TournamentLayout {
  &__list {
    display: flex;
    align-items: stretch;
    overflow-x: scroll;
  }
  &__prev-block {
    margin-right: 60px;
    @media screen and (max-width: 768px) {
      margin-right: 30px;
    }
  }
  &__block {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    @media screen and (max-width: 768px) {
      margin-bottom: 15px;
    }
    &:before {
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background-color: #999;
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      @media screen and (max-width: 768px) {
        width: 15px;
        left: 100%;
      }
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
      @media screen and (max-width: 768px) {
        left: calc(100% + 13px);
      }
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
      @media screen and (max-width: 768px) {
        width: 15px;
        right: 100%;
      }
    }
    &:last-child {
      &::before {
        content: none;
      }
    }
  }
}
</style>
