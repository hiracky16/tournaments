<template>
  <div class="TournamentEditTemplate">
    <div class="card TournamentEditTemplate__card">
      <div class="TournamentEditTemplate__nav">
        <div class="TournamentEditTemplate__nav-left">
          <span class="link-nav" @click="confirmCancel">
            ←編集をキャンセル
          </span>
        </div>
        <div class="TournamentEditTemplate__nav-left">
          <button class="link-button" @click="confirmEdit">
            トーナメントの編集を保存
          </button>
        </div>
      </div>
      <TournamentLayout :rounds="rounds" :isEditable="true" />
    </div>
  </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TournamentLayout from '~/components/TournamentLayout.vue'
import { Game } from '~/models/tournament'

@Component({
  components: { TournamentLayout }
})
export default class TournamentEditTemplate extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  rounds!: {
    games: Game[]
  }[];

  confirmEdit () {
    // TODO: モーダルを表示して完了確認→シェア確認できるようにする
    const res = confirm('編集を保存しますか？');
    if (res) {
      this.$router.push(`/tournament/${this.$route.params.id}/complete`);
    }
  }

  confirmCancel () {
    const res = confirm('編集内容を破棄して戻りますか？');
    if (res) {
      this.$router.push(`/tournament/${this.$route.params.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.TournamentEditTemplate {
  &__card {
    padding: 30px;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
.link-nav {
  color: #666;
  cursor: pointer;
}
.link-button {
  display: inline-block;
  padding: 10px 16px;
  background: #f5576c;
  background-image: linear-gradient(120deg, #fb93c7 0%, #f5576c 100%);
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  cursor: pointer;
}
</style>
