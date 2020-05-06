import createPersistedState from 'vuex-persistedstate'

interface MyWindow extends Window {
  onNuxtReady(obj: object): void
}
declare let window: MyWindow

export default (obj: { store: object; isHMR: object }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (obj.isHMR) { return }

  if (process.client) {
    window.onNuxtReady((nuxt: object) => {
      // vuex plugins can be connected to store, even after creation
      createPersistedState()(obj.store)
    })
  }
}
