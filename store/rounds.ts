import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Game, GameParams } from '~/models/tournament'
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

export const mutations: MutationTree<RootState> = {
  // FIXME: type
  [SET_USER_TOURNAMENT] (state: State, tournament: any) {
    state.userTournament = tournament
  },
  [UPDATE_GAME_WINNER] (state: State, gameParams: GameParams) {
    const { roundIdx, gameIdx, game } = gameParams
    Vue.set(state.userTournament.rounds.slice(-roundIdx - 1)[0].games, gameIdx, game)
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
  updateGameWinner ({ commit }, gameParams: GameParams) {
    commit(UPDATE_GAME_WINNER, gameParams)
  }
}
