<template>
  <div v-if="isDisplay">
    <article class="message is-primary">
      <div class="message-body">
        {{ displayMessage }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Message extends Vue {
  @Prop({ type: Boolean, required: true })
  isDisplay!: boolean

  @Prop({ type: String, required: true })
  displayMessage!: string
}
</script>

<style lang="scss" scoped>
</style>
