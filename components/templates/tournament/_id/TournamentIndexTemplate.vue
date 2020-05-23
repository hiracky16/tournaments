<template>
  <div class="TournamentIndexTemplate">
    <div class="card TournamentIndexTemplate__card">
      <div class="TournamentIndexTemplate__nav">
        <div v-if="user" class="TournamentIndexTemplate__nav-left">
          <nuxt-link :to="`/user/${user.id}`" class="link-nav">
            ←ホームへ戻る
          </nuxt-link>
        </div>
        <div v-if="isOwn" class="TournamentIndexTemplate__nav-left">
          <Button label="このトーナメントを編集" :on-click="routeEditPage" />
        </div>
      </div>
      <TournamentLayout :rounds="rounds" :is-editable="false" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import TournamentLayout from '~/components/TournamentLayout.vue'
import Button from '~/components/Button.vue'
import { Game } from '~/models/tournament'
import User from '@/models/User'

@Component({
  components: { TournamentLayout, Button }
})
export default class TournamentIndexTemplate extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  rounds!: {
    games: Game[]
  }[];

  @Prop({ type: Boolean, required: true })
  isOwn!: boolean

  @Prop({ type: User, required: true })
  user!: User

  routeEditPage () {
    this.$router.push(`/user/${this.$route.params.userId}/tournament/${this.$route.params.id}/edit`)
  }
}
</script>

<style lang="scss" scoped>
.TournamentIndexTemplate {
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
}
</style>
