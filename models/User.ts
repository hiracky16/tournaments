import firebase from '@/plugins/firebase'

const ref = firebase.firestore().collection('users')

export default class User {
  id: string
  name: string
  image: string
  twitterId: string | null | undefined
  description: string | null | undefined

  constructor (
    id: string,
    name: string,
    image: string,
    twitterId: string | null | undefined
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.twitterId = twitterId
  }

  static async login () {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    const firebaseUser = res.user
    const twtterId = res.additionalUserInfo?.username
    return new User(
      firebaseUser?.uid || '',
      firebaseUser?.displayName || '',
      firebaseUser?.photoURL || '',
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
    await firebase
      .firestore()
      .collection(`users/${this.id}/tweets`)
      .doc()
      .set({ text })
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
  createdAt: Date | null

  constructor (id: string, name: string, createdAt: Date | null = null) {
    this.id = id
    this.name = name
    this.createdAt = createdAt
  }
}
