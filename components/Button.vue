<template>
  <button class="app-button" :class="{disabled: disabled}" :disabled="disabled" @click="onClick">
    <span class="label">{{ label }}</span>
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
  border: none;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  .label {
    position: relative;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    z-index: 2;
  }
  &:focus {
    outline: solid 4px #ffafba;
  }
  &:after {
    content: '';
    display: block;
    width: calc(100% + 120px);
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(120deg, #ffdcc8 0%, #f580ba 50%, #f5576c 100%);
    z-index: 1;
    transition: .3s ease;
  }
  &:hover {
    &:after {
      transform: translateX(120px);
    }
  }
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
