import firebase from '@/plugins/firebase'

const ref = firebase.firestore().collection('tournaments')

export default class FirestoreTournament {
  id: string
  name: string
  players: Player[]

  constructor (id: string, name: string, players: Player[] = []) {
    this.name = name
    this.id = id
    this.players = players
  }

  static async findAll () {
    const res = await firebase
      .firestore()
      .collection('tournaments')
      .get()
    return res.docs.map((r) => {
      return new FirestoreTournament(r.id, r.data()?.name)
    })
  }

  static async findById (id: string) {
    const res = await ref.doc(id).get()
    const playerRes = await firebase
      .firestore()
      .collection(`tournaments/${id}/players`)
      .get()
    const players = playerRes.docs.map((p) => {
      return new Player(p.id, p.data()?.name)
    })
    return new FirestoreTournament(res.id, res.data()?.name, players)
  }
}

export class Player {
  id: string
  name: string

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }
}
