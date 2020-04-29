import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from '@/plugins/firebase'

interface Tournament {
  id: string
  name: string
}

type State = {
  tournaments: Tournament[]
}

export const state = () => ({
  tournaments: [] as Tournament[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tournaments: state => state.tournaments
}

const SET_TOURNAMENTS = 'SET_TOURNAMENTS'

export const mutations: MutationTree<RootState> = {
  [SET_TOURNAMENTS] (state: State, tournaments: Tournament[]) {
    state.tournaments = tournaments
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchTournaments ({ commit }) {
    const tournaments: { [key: string]: string }[] = []
    await firebase
      .firestore()
      .collection('tournaments')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tournaments.push({ id: doc.id, name: doc.data()?.name })
        })
      })
    commit(SET_TOURNAMENTS, tournaments)
  }
}
