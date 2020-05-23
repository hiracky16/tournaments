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
          <Button label="トーナメントの編集を保存" :on-click="confirmEdit" />
        </div>
      </div>
      <TournamentLayout :rounds="rounds" :is-editable="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, namespace } from 'nuxt-property-decorator'
import TournamentLayout from '~/components/TournamentLayout.vue'
import { Round } from '~/models/tournament'
import Button from '~/components/Button.vue'

const RoundStore = namespace('rounds')

@Component({
  components: { TournamentLayout, Button }
})
export default class TournamentEditTemplate extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  rounds!: Round[];

  @RoundStore.Action('storeUserTournament')
  storeUserTournament!: ({ tournamentId }: {tournamentId: string}) => void

  async confirmEdit () {
    // TODO: モーダルを表示して完了確認→シェア確認できるようにする
    const res = confirm('編集を保存しますか？')
    if (res) {
      await this.storeUserTournament({ tournamentId: this.$route.params.id })
      this.$router.push(`/user/${this.$route.params.userId}/tournament/${this.$route.params.id}/complete`)
    }
  }

  confirmCancel () {
    const res = confirm('編集内容を破棄して戻りますか？')
    if (res) {
      this.$router.push(`/user/${this.$route.params.userId}/tournament/${this.$route.params.id}`)
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
</style>
