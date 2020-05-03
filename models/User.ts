/* eslint-disable no-useless-catch */
import firebase from '@/plugins/firebase'

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
    try {
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
    } catch (error) {
      throw error
    }
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
}
