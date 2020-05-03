import { ActionTree, GetterTree, MutationTree } from 'vuex'
import User from '@/models/User'

type State = {
  isLogin: boolean
  user: User | null
}

export const state = () => ({
  isLogin: false as boolean,
  user: null as User | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLogin: state => state.isLogin,
  user: state => state.user
}

const SET_IS_LOGIN = 'SET_IS_LOGIN'
const SET_USER = 'SET_USER'

export const mutations: MutationTree<RootState> = {
  [SET_IS_LOGIN] (state: State, flag: boolean) {
    state.isLogin = flag
  },
  [SET_USER] (state: State, user: User) {
    state.user = user
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }) {
    try {
      const user = await User.login()
      commit(SET_USER, user)
      commit(SET_IS_LOGIN, true)
      user.storeUser()
    } catch (error) {
      commit(SET_USER, null)
      commit(SET_IS_LOGIN, false)
      throw error
    }
  },
  async logout ({ getters, commit }) {
    await getters.user.logout()
    commit(SET_IS_LOGIN, false)
    commit(SET_USER, null)
  },
  async tweet ({ getters }) {
    await getters.user.tweet()
  }
}
