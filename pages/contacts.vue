<template>
  <div class="container">
      <h1>お問い合わせページ</h1>
			<div class="field">
      	<div class="control">
        	<label class="radio">
        		<input type="radio" name="answer" value="feature" @change="clickRadioButton">
    					機能追加要望
					</label>
  				<label class="radio">
    				<input type="radio" name="answer" value="addtournaments" @change="clickRadioButton">
    					トーナメント追加要望
					</label>
					<label class="radio">
						<input type="radio" name="answer" value="bug" @change="clickRadioButton">
							バグ改善要望
					</label>
				</div>
			</div>
			<div class="field">
  			<div class="control">
					<input type="text" class="input" placeholder="タイトル" @input="inputTitle" ></input>
				</div>
			</div>
			<div class="field">
  			<div class="control">
					<textarea class="textarea" placeholder="内容" @input="inputContent"></textarea>
				</div>
			</div>
			<div class="field">
  			<div class="control">
        	<button class="button is-primary is-medium" @click="submit">
          	送信
        	</button>
      	</div>
			</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import User from '~/models/User'
import firebase from '@/plugins/firebase'
const UserStore = namespace('users')

@Component({})
export default class ContactPage extends Vue {
	private radioButtonValue = ""
	private title = ""
	private content = ""
	
	@UserStore.Getter('user')
	user!: User

	clickRadioButton(element: Event) {
		this.radioButtonValue = element.target.value
		console.log(this.radioButtonValue)
	}

	inputTitle(element: InputEvent) {
		this.title = element.target.value
		console.log(this.title)
	}

	inputContent(element: InputEvent) {
		this.content = element.target.value
		console.log(this.content)
	}

	async submit() {
		const data = {
			userId: this.user.id,
			type: this.radioButtonValue,
			title: this.title,
			content: this.content
		}
		await firebase
      .firestore()
      .collection(`contacts`)
      .doc()
      .set(data)
	}
}
</script>

<style lang="scss" scoped>
</style>