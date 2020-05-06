import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Game, GameParams } from '~/models/tournament'

interface Round {
  games: Game[]
}

type State = {
  rounds: Round[],
  userTournament: any
}

export const state = () => ({
  rounds: [] as Round[],
  userTournament: null as any
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  rounds: state => state.rounds,
  userTournament: state => state.userTournament
}

const UPDATE_GAME_WINNER = 'UPDATE_GAME_WINNER'
const SET_ROUNDS = 'SET_ROUNDS'
const SET_USER_TOURNAMENT = 'SET_USER_TOURNAMENT'

export const mutations: MutationTree<RootState> = {
  [SET_ROUNDS] (state: State, rounds: Round[]) {
    state.rounds = rounds
  },
  [UPDATE_GAME_WINNER] (state: State, gameParams: GameParams) {
    const rounds = state.rounds
    const round = rounds.slice(-gameParams.roundIdx - 1)[0]
    round.games[gameParams.gameIdx] = gameParams.game
    state.rounds = rounds
  },
  // TODO: type
  [SET_USER_TOURNAMENT] (state: State, tournament: any) {
    state.userTournament = tournament
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchUserTournament ({ commit, rootGetters }, id: string) {
    const user = rootGetters['users/user']
    const tournament = await user.findUserTournamentById(id)
    commit(SET_USER_TOURNAMENT, tournament)
  },
  setInitialRounds ({ commit }, rounds: Round[]) {
    commit(SET_ROUNDS, rounds)
  },
  updateGameWinner ({ commit }, gameParams: GameParams) {
    commit(UPDATE_GAME_WINNER, gameParams)
  }
}
