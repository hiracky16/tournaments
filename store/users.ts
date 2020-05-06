import { ActionTree, GetterTree, MutationTree } from 'vuex'
import User, { UserTournament } from '@/models/User'

type State = {
  isLogin: boolean
  user: User | null,
  userTournaments: UserTournament[]
}

export const state = () => ({
  isLogin: false as boolean,
  user: null as User | null,
  userTournaments: [] as UserTournament[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLogin: state => state.isLogin,
  user: state => state.user,
  userTournaments: state => state.userTournaments
}

const SET_IS_LOGIN = 'SET_IS_LOGIN'
const SET_USER = 'SET_USER'
const SET_USER_TOURNAMENTS = 'SET_USER_TOURNAMENTS'

export const mutations: MutationTree<RootState> = {
  [SET_IS_LOGIN] (state: State, flag: boolean) {
    state.isLogin = flag
  },
  [SET_USER] (state: State, user: User) {
    state.user = user
  },
  [SET_USER_TOURNAMENTS] (state: State, userTournaments: UserTournament[]) {
    state.userTournaments = userTournaments
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }) {
    try {
      const user = await User.login()
      const tournaments = user.fetchUserTournaments()
      commit(SET_USER, user)
      commit(SET_IS_LOGIN, true)
      user.storeUser()
    } catch (error) {
      commit(SET_USER, null)
      commit(SET_IS_LOGIN, false)
      commit(SET_USER_TOURNAMENTS, [])
      throw error
    }
  },
  async logout ({ getters, commit }) {
    await getters.user.logout()
    commit(SET_IS_LOGIN, false)
    commit(SET_USER, null)
    commit(SET_USER_TOURNAMENTS, [])
  },
  async tweet ({ getters }) {
    await getters.user.tweet()
  },
  async fetchUserTournaments ({ commit, getters }) {
    commit(SET_USER_TOURNAMENTS, await getters.user.fetchUserTournaments())
  }
}
