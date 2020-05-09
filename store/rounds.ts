import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Round, UpdateGameParams, UpdateNextGamePlayerParams, PlayerKeys } from '~/models/tournament'
import User from '~/models/User'
import firebase from '@/plugins/firebase'

type UserTournamentType = {
  name: string,
  rounds: Round[],
}

type State = {
  userTournament: UserTournamentType,
}

export const state = () => ({
  userTournament: {
    name: '',
    rounds: []
  } as UserTournamentType
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  userTournament: state => state.userTournament
}

const SET_USER_TOURNAMENT = 'SET_USER_TOURNAMENT'
const UPDATE_GAME_WINNER = 'UPDATE_GAME_WINNER'
const UPDATE_NEXT_GAME_PLAYER = 'UPDATE_NEXT_GAME_PLAYER'

export const mutations: MutationTree<RootState> = {
  // FIXME: type
  [SET_USER_TOURNAMENT] (state: State, tournament: any) {
    state.userTournament = tournament
  },
  [UPDATE_GAME_WINNER] (state: State, gameParams: UpdateGameParams) {
    const { gameIdx, roundIdx, game } = gameParams

    // 操作したゲーム自体の勝敗変更
    const currentRoundGames = state.userTournament.rounds.slice(-roundIdx - 1)[0].games
    Vue.set(currentRoundGames, gameIdx, game)

    // 決勝戦の場合は処理を終了する
    if (roundIdx === 0) { return }

    // 次のゲームのプレーヤー変更
    const winnerPlayerKey = Object.keys(game).filter((player) => {
      return game[player as PlayerKeys].winner
    })
    const winnerPlayer = { ...game[winnerPlayerKey[0] as PlayerKeys] }
    winnerPlayer.winner = undefined

    let nextPlayerKey: PlayerKeys
    if (gameIdx % 2 === 0) {
      nextPlayerKey = 'player1'
    } else {
      nextPlayerKey = 'player2'
    }
    const nextGameIdx = Math.floor(gameIdx / 2)
    const nextGame = state.userTournament.rounds.slice(-roundIdx)[0].games[nextGameIdx]
    const nextGamePlayer = nextGame[nextPlayerKey]

    Vue.set(nextGamePlayer, 'id', winnerPlayer.id)
    Vue.set(nextGamePlayer, 'name', winnerPlayer.name)
  },
  [UPDATE_NEXT_GAME_PLAYER] (state: State, updateGameParams: UpdateNextGamePlayerParams) {
    const { gameIdx, roundIdx, player } = updateGameParams

    let nextPlayerKey: PlayerKeys
    if (gameIdx % 2 === 0) {
      nextPlayerKey = 'player1'
    } else {
      nextPlayerKey = 'player2'
    }

    const nextGameIdx = Math.floor(gameIdx / 2)
    const nextGame = state.userTournament.rounds.slice(-roundIdx)[0].games[nextGameIdx]
    const nextGamePlayer = nextGame[nextPlayerKey]

    if (player.winner && nextGamePlayer.id !== '' && nextGamePlayer.id !== player.id) {
      Vue.set(nextGamePlayer, 'id', player.id)
      Vue.set(nextGamePlayer, 'name', player.name)
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchUserTournament ({ commit, rootGetters }, id: string) {
    let user = rootGetters['users/user']
    if (!(user instanceof User)) {
      user = new User(user.id, user.name, user.image, user.twitterId)
    }
    const tournament = await user.findUserTournamentById(id)
    commit(SET_USER_TOURNAMENT, tournament)
  },
  updateGameWinner ({ commit }, params: UpdateGameParams) {
    commit(UPDATE_GAME_WINNER, params)
  },
  updateNextGamePlayer ({ commit }, params: UpdateNextGamePlayerParams) {
    commit(UPDATE_NEXT_GAME_PLAYER, params)
  },
  async storeUserTournament ({ getters, rootGetters }, params: { tournamentId: string }) {
    const { tournamentId } = params
    const user = rootGetters['users/user']

    await firebase
      .firestore()
      .collection(`users/${user.id}/tournaments/`)
      .doc(tournamentId)
      .set(getters.userTournament)
    return tournamentId
  }
}
