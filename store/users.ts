import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from '@/plugins/firebase'
import Twitter from '@/plugins/TwitterClient'

require('dotenv').config()

const userRef = firebase.firestore().collection('users')

const TWITTER_POST_ENDPOINT = 'statuses/update.json'

interface User {
  uid: string
  isLogin: boolean
  image: string
  name: string
  account: string,
  token: string,
  secret: string
}

export const state = () => ({
  uid: '' as string,
  isLogin: false as boolean,
  image: '' as string,
  name: '' as string,
  account: '' as string,
  token: '' as string,
  secret: '' as string
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  uid: state => state.uid,
  isLogin: state => state.isLogin,
  image: state => state.image,
  name: state => state.name,
  account: state => state.account,
  token: state => state.token,
  secret: state => state.secret
}

const SET_UID = 'SET_UID'
const SET_IS_LOGIN = 'SET_IS_LOGIN'
const SET_IMAGE = 'SET_IMAGE'
const SET_NAME = 'SET_NAME'
const SET_ACCOUNT = 'SET_ACCOUNT'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_TOKEN = 'SET_TOKEN'
const SET_SECRET = 'SET_SECRET'

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
  },
  [SET_TOKEN] (state: User, token: string) {
    state.token = token
  },
  [SET_SECRET] (state: User, secret: string) {
    state.secret = secret
  },
  [SET_USER_INFO] (state: User, usreInfo: any | null) {
    if (usreInfo) {
      state.uid = usreInfo?.uid
      state.image = usreInfo?.photoURL
      state.name = usreInfo?.displayName
      state.account = ''
    } else {
      state.uid = ''
      state.image = ''
      state.name = ''
      state.account = ''
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit, dispatch }) {
    try {
      const res = await firebase
        .auth()
        .signInWithPopup(
          new firebase.auth.TwitterAuthProvider()
        )
      // FIXME: type になかったので暫定対応
      const token = (res?.credential as any)?.accessToken
      const secret = (res?.credential as any)?.secret
      console.log(res.user)
      commit(SET_USER_INFO, res.user)
      commit(SET_IS_LOGIN, true)
      commit(SET_TOKEN, token)
      commit(SET_SECRET, secret)
      dispatch('storeUser')
    } catch (error) {
      commit(SET_USER_INFO, null)
      commit(SET_IS_LOGIN, false)
      throw error
    }
  },
  checkLogin ({ commit }) {
    try {
      const user = firebase.auth().currentUser
      if (user) {
        commit(SET_IS_LOGIN, true)
        commit(SET_USER_INFO, user)
      } else {
        throw Error
      }
    } catch (error) {
      commit(SET_IS_LOGIN, false)
      commit(SET_USER_INFO, null)
      throw error
    }
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
    commit(SET_IS_LOGIN, false)
    commit(SET_USER_INFO, null)
  },
  async tweet ({ getters }) {
    const twitter = new Twitter(
      process.env.TWITTER_API_KEY,
      process.env.TWITTER_API_SECRET_KEY,
      getters.token,
      getters.secret
    )
    const params = [
      { key: 'status', value: '今日は暑いね' }
    ]
    const url = `/api/${TWITTER_POST_ENDPOINT}`
    const json = await twitter.post(url, params)
    console.log(json)
    // const url = 'http://localhost:3000/api/friends/list.json'
    // const params = [
    //   { key: 'screen_name', value: 'TwitterJP' }
    // ]
    // const json = await twitter.get(url, params)
    // console.log(json)

    // console.log(hmac.digest('hex'))
    // await axios.post(, {
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: `OAuth oauth_consumer_key=${process.env.TWITTER_API_KEY},oauth_token="${getters.token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1515677408",oauth_nonce="nonce",,oauth_version="1.0",,oauth_signature="signature"`
    //   },
    //   data: { status: '今日暑いね' }
    // })
    // const client = new Twitter({
    //   consumer_key: `${process.env.TWITTER_API_KEY}`,
    //   consumer_secret: `${process.env.TWITTER_API_SECRET_KEY}`,
    //   access_token_key: `${getters.token}`,
    //   access_token_secret: `${getters.secret}`
    // })
    // await client.post('statuses/update', { status: '今日暑い...' }, (error: any, tweet: any, response: any) => {
    //   if (error) { throw error }
    //   console.log(tweet)
    //   console.log(response)
    // })
  },
  async storeUser ({ getters }) {
    console.log('user store')
    const res = await userRef.doc(getters.uid).set({
      name: getters.name,
      image: getters.image
    })
    console.log(res)
  }
}
