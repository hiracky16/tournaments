import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from '@/plugins/firebase'

interface User {
  uid: string
  isLogin: boolean
  image: string
  name: string
  account: string
}

export const state = () => ({
  uid: '' as string,
  isLogin: false as boolean,
  image: '' as string,
  name: '' as string,
  account: '' as string
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  uid: state => state.uid,
  isLogin: state => state.isLogin,
  image: state => state.image,
  name: state => state.name,
  account: state => state.account
}

const SET_UID = 'SET_UID'
const SET_IS_LOGIN = 'SET_IS_LOGIN'
const SET_IMAGE = 'SET_IMAGE'
const SET_NAME = 'SET_NAME'
const SET_ACCOUNT = 'SET_ACCOUNT'

export const mutations: MutationTree<RootState> = {
  [SET_UID] (state: User, uid: string) {
    state.uid = uid
  },
  [SET_IS_LOGIN] (state: User, flag: boolean) {
    state.isLogin = flag
  },
  [SET_IMAGE] (state: User, image: string) {
    state.image = image
  },
  [SET_NAME] (state: User, name: string) {
    state.name = name
  },
  [SET_ACCOUNT] (state: User, account: string) {
    state.account = account
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }) {
    try {
      const res = await firebase
        .auth()
        .signInWithPopup(
          new firebase.auth.TwitterAuthProvider()
        )
      commit(SET_UID, res.user?.uid)
      commit(SET_IMAGE, res.user?.photoURL)
      commit(SET_NAME, res.user?.displayName)
      commit(SET_ACCOUNT, '')
      commit(SET_IS_LOGIN, true)
    } catch (error) {
      commit(SET_UID, '')
      commit(SET_IMAGE, '')
      commit(SET_NAME, '')
      commit(SET_ACCOUNT, '')
      commit(SET_IS_LOGIN, false)
      throw error
    }
  },
  checkLogin ({ commit }) {
    try {
      const user = firebase.auth().currentUser
      if (user) {
        commit(SET_IS_LOGIN, true)
        commit(SET_UID, user?.uid)
        commit(SET_IMAGE, user?.photoURL)
        commit(SET_NAME, user?.displayName)
      } else {
        throw Error
      }
    } catch (error) {
      commit(SET_IS_LOGIN, false)
      commit(SET_IMAGE, '')
      commit(SET_NAME, '')
      commit(SET_UID, '')
      throw error
    }
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
    commit(SET_IS_LOGIN, false)
    commit(SET_IMAGE, '')
    commit(SET_NAME, '')
    commit(SET_UID, '')
  }
}
