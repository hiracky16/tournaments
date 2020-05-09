import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Game, UpdateGameParams, UpdateNextGamePlayerParams, PlayerKeys } from '~/models/tournament'
import User from '~/models/User'

interface Round {
  games: Game[]
}

type State = {
  userTournament: any
}

export const state = () => ({
  userTournament: null as any
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
    const winnerKey = Object.keys(game).filter((player) => {
      return game[player as PlayerKeys].winner
    })
    const winnerPlayer = { ...game[winnerKey[0] as PlayerKeys] }
    winnerPlayer.winner = undefined
    let nextPlayerKey: PlayerKeys
    if (gameIdx % 2 === 0) {
      nextPlayerKey = 'player1'
    } else {
      nextPlayerKey = 'player2'
    }
    const nextGameIdx = Math.floor(gameIdx / 2)

    const currentRoundGames = state.userTournament.rounds.slice(-roundIdx - 1)[0].games
    const nextGame = state.userTournament.rounds.slice(-roundIdx)[0].games[nextGameIdx]
    const nextGamePlayer = nextGame[nextPlayerKey]

    Vue.set(currentRoundGames, gameIdx, game)
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
    const nextPlayer = nextGame[nextPlayerKey]

    if (player.winner && nextPlayer.id !== '' && nextPlayer.id !== player.id) {
      Vue.set(nextPlayer, 'id', player.id)
      Vue.set(nextPlayer, 'name', player.name)
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchUserTournament ({ commit, rootGetters }, id: string) {
    let user = rootGetters['users/user']
    if (!(user instanceof User)) {
      user = new User(user.id, user.name, user.image, user.token, user.secret, user.twitterId)
    }
    const tournament = await user.findUserTournamentById(id)
    commit(SET_USER_TOURNAMENT, tournament)
  },
  updateGameWinner ({ commit }, gameParams: UpdateGameParams) {
    commit(UPDATE_GAME_WINNER, gameParams)
  },
  updateNextGamePlayer ({ commit }, gameParams: UpdateNextGamePlayerParams) {
    commit(UPDATE_NEXT_GAME_PLAYER, gameParams)
  }
}
