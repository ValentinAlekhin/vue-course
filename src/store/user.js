import firebase from 'firebase/app'
import 'firebase/auth'
class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
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
        commit('setUser', new User(uid))
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
        commit('setUser', new User(uid))
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
}
