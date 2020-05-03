import { ActionTree, GetterTree, MutationTree } from 'vuex'
import Twitter from '@/plugins/TwitterClient'
import User from '@/models/User'

require('dotenv').config()

const TWITTER_POST_ENDPOINT = 'statuses/update.json'

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
  }
}
