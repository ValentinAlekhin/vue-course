import firebase from 'firebase/app'
import 'firebase/auth'
class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    id: null,
  },
  mutations: {
    setUser(state, payload) {
      state.id = payload
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const { uid } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
        commit('setUser', uid)
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const { uid } = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
        commit('setUser', uid)
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
    autoLoginUser({ commit }, { uid }) {
      commit('setUser', uid)
    },
    logoutUser({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
  },
  getters: {
    userId(state) {
      return state.id
    },
    isUserLoggedIn(state) {
      return !!state.id
    },
  },
}
