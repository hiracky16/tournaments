import firebase from '@/plugins/firebase'

export default class UserTournament {
  userId: string
  id: string
  name: string
  rounds: any

  constructor (
    id: string,
    userId: string,
    name: string,
    rounds: any
  ) {
    this.id = id
    this.userId = userId
    this.name = name
    this.rounds = rounds
  }

  static async findByUserIdAndId (userId: string, id: string) {
    const res = await firebase
      .firestore()
      .collection(`users/${userId}/tournaments/`)
      .doc(id)
      .get()
    // FIXME: ts 化
    return res.data()
  }
}
