import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Game, GameParams } from '~/models/tournament'

interface Round {
  games: Game[]
}

type State = {
  rounds: Round[]
}

export const state = () => ({
  rounds: [] as Round[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  rounds: state => state.rounds
}

const UPDATE_GAME_WINNER = 'UPDATE_GAME_WINNER'
const SET_ROUNDS = 'SET_ROUNDS'

export const mutations: MutationTree<RootState> = {
  [SET_ROUNDS] (state: State, rounds: Round[]) {
    state.rounds = rounds
  },
  [UPDATE_GAME_WINNER] (state: State, gameParams: GameParams) {
    const rounds = state.rounds
    const round = rounds.slice(-gameParams.roundIdx - 1)[0]
    round.games[gameParams.gameIdx] = gameParams.game
    state.rounds = rounds
  }
}

export const actions: ActionTree<RootState, RootState> = {
  setInitialRounds ({ commit }, rounds: Round[]) {
    commit(SET_ROUNDS, rounds)
  },
  updateGameWinner ({ commit }, gameParams: GameParams) {
    commit(UPDATE_GAME_WINNER, gameParams)
  }
}
