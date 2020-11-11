import firebase from 'firebase/app'
import 'firebase/database'

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: [],
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    },
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)

      try {
        commit('clearError')
        await firebase
          .database()
          .ref(`/users/${ownerId}/orders`)
          .push(order)
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    },

    async fetchOrders({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')

      try {
        const fbVal = await firebase
          .database()
          .ref(`/users/${getters.userId}/orders`)
          .once('value')

        const orders = Object.entries(fbVal.val()).map(([key, value]) => ({
          ...value,
          id: key,
        }))

        commit('loadOrders', orders)
      } catch (e) {
        commit('setError', e.message)
        throw e
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    doneOrders(state) {
      return state.order.filter(o => o.done)
    },

    undoneOrders(state) {
      return state.order.filter(o => !o.done)
    },

    ordres(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    },
  },
}
