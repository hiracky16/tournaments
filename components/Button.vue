<template>
  <button class="app-button" :class="{disabled: disabled}" :disabled="disabled" @click="onClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Button extends Vue {
  @Prop({
    type: Function,
    required: false
  })
  onClick!: Function;

  @Prop({
    type: String,
    required: true
  })
  label!: string

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  disabled!: boolean
}
</script>

<style lang="scss" scoped>
.app-button {
  display: inline-block;
  padding: 10px 16px;
  min-width: 240px;
  background: #f5576c;
  background-image: linear-gradient(120deg, #fb93c7 0%, #f5576c 100%);
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  cursor: pointer;
  outline:solid 3px #ffa5a0;
  &.disabled {
    opacity: .5;
    cursor: no-drop;
  }
  @media screen and (max-width: 768px) {
    padding: 14px 16px;
    min-width: auto;
    width: 100%;
  }
}
</style>
