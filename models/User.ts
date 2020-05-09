import axios from 'axios'
import firebase from '@/plugins/firebase'

const ref = firebase.firestore().collection('users')

export default class User {
  id: string
  name: string
  image: string
  token: string
  secret: string
  twitterId: string | null | undefined
  description: string | null | undefined

  constructor (
    id: string,
    name: string,
    image: string,
    token: string,
    secret: string,
    twitterId: string | null | undefined
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.token = token
    this.secret = secret
    this.twitterId = twitterId
  }

  static async login () {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    const token = (res?.credential as any)?.accessToken
    const secret = (res?.credential as any)?.secret
    const firebaseUser = res.user
    const twtterId = res.additionalUserInfo?.username
    return new User(
      firebaseUser?.uid || '',
      firebaseUser?.displayName || '',
      firebaseUser?.photoURL || '',
      token,
      secret,
      twtterId
    )
  }

  async logout () {
    await firebase.auth().signOut()
  }

  async storeUser () {
    await ref.doc(this.id).set({
      name: this.name,
      image: this.image,
      twitterId: this.twitterId
    })
  }

  async tweet (text: string) {
    const params = { text, token: this.token, secret: this.secret }
    const res = await axios.post('/api/tweets', params)
    console.log(res)
  }

  async findUserTournamentById (tournamentId: string) {
    const res = await firebase
      .firestore()
      .collection(`users/${this.id}/tournaments`)
      .doc(tournamentId)
      .get()
    return res.data()
  }

  async fetchUserTournaments () {
    const res = await firebase
      .firestore()
      .collection(`users/${this.id}/tournaments`)
      .get()
    const tournaments = res.docs.map((t) => {
      return new UserTournament(t.id, t.data()?.name)
    })
    return tournaments
  }
}

export class UserTournament {
  id: string
  name: string

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }
}
