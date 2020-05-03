import firebase from '@/plugins/firebase'
import Twitter from '@/plugins/TwitterClient'

require('dotenv').config()

const TWITTER_POST_ENDPOINT = 'statuses/update.json'

const ref = firebase.firestore().collection('users')

export default class User {
  id: string;
  name: string;
  image: string;
  token: string;
  secret: string;

  constructor (
    id: string,
    name: string,
    image: string,
    token: string,
    secret: string
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.token = token
    this.secret = secret
  }

  static async login () {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    const token = (res?.credential as any)?.accessToken
    const secret = (res?.credential as any)?.secret
    const firebaseUser = res.user
    return new User(
      firebaseUser?.uid || '',
      firebaseUser?.displayName || '',
      firebaseUser?.photoURL || '',
      token,
      secret
    )
  }

  async logout () {
    await firebase.auth().signOut()
  }

  async storeUser () {
    await ref.doc(this.id).set({
      name: this.name,
      image: this.image
    })
  }

  async tweet (text: string) {
    const twitter = new Twitter(
      process.env.TWITTER_API_KEY,
      process.env.TWITTER_API_SECRET_KEY,
      this.token,
      this.secret
    )
    const params = [
      { key: 'status', value: text }
    ]
    const url = `/api/${TWITTER_POST_ENDPOINT}`
    const json = await twitter.post(url, params)
    console.log(json)
  }
}
