import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
  const user = store.getters['users/user']
  if (!user) {
    return redirect('/')
  }
}

export default auth
