import { ActionTree, GetterTree, MutationTree } from 'vuex'
import FirestoreTournament from '~/models/FirestoreTournament'

type State = {
  tournaments: FirestoreTournament[],
  tournament: FirestoreTournament | null
}

export const state = () => ({
  tournaments: [] as FirestoreTournament[],
  tournament: null as FirestoreTournament | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tournaments: state => state.tournaments,
  tournament: state => state.tournament
}

const SET_TOURNAMENTS = 'SET_TOURNAMENTS'
const SET_TOURNAMENT = 'SET_TOURNAMENT'

export const mutations: MutationTree<RootState> = {
  [SET_TOURNAMENTS] (state: State, tournaments: FirestoreTournament[]) {
    state.tournaments = tournaments
  },
  [SET_TOURNAMENT] (state: State, tournament: FirestoreTournament) {
    state.tournament = tournament
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchTournaments ({ commit }) {
    commit(SET_TOURNAMENTS, await FirestoreTournament.findAll())
  },
  async fetchAndRegisterTournament ({ commit }, data: {id: string, userId: string}) {
    const tournament = await FirestoreTournament.findById(data.id)
    commit(SET_TOURNAMENT, tournament)
    return await tournament.registerUserTournament(data.userId)
  }
}
