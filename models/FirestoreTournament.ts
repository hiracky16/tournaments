import firebase from '@/plugins/firebase'

const ref = firebase.firestore().collection('tournaments')

export default class FirestoreTournament {
  private DEFAULT_PLAYER_COUNT = 32

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

  generateRounds () {
    // 選択肢の数
    let playersCount = this.DEFAULT_PLAYER_COUNT
    const tournamentPlayers = shuffle(this.players).slice(0, playersCount)
    // イケてない…からだれか助けて
    const rounds = []
    const games = []
    for (let i = 0; i < playersCount; i = i + 2) {
      games.push(
        {
          player1: { id: tournamentPlayers[i].id, name: tournamentPlayers[i].name },
          player2: { id: tournamentPlayers[i + 1].id, name: tournamentPlayers[i + 1].name }
        }
      )
    }
    rounds.push({ games })
    while (true) {
      playersCount = playersCount / 2
      if (playersCount < 2) { break }
      const games = generateEmptyGame(playersCount)
      rounds.push(games)
    }
    return rounds
  }

  async registerUserTournament (userId: string) {
    const rounds = this.generateRounds()
    await firebase
      .firestore()
      .collection(`users/${userId}/tournaments`)
      .doc()
      .set({ name: this.name, rounds })
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

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const generateEmptyGame = (n: number) => {
  const games = []
  const emptyPlayerData = { id: '', name: '' }
  for (let i = 0; i < (n / 2); i++) {
    games.push({ player1: emptyPlayerData, player2: emptyPlayerData })
  }
  return { games }
}
