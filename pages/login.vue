<template>
  <button @click="login">
    Twitter でログイン
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'

@Component({})
export default class Login extends Vue {
  login () {
    firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())
  }
}
</script>
