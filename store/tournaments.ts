import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from '@/plugins/firebase'
import FirestoreTournament from '~/models/FirestoreTournament'

interface Tournament {
  id: string
  name: string
}

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
  async fetchTournament ({ commit }, id) {
    commit(SET_TOURNAMENT, await FirestoreTournament.findById(id))
  }
}
