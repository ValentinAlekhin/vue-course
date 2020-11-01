export default {
  state: {
    orders: [],
  },
  mutations: {
    createOrder(state, payload) {
      state.orders = payload
    },
  },
  actions: {
    async createOrder({ commit }, {}) {
      await new Promise((res, rej) => {
        setTimeout(() => {
          res()
        }, 2000)
      })
    },
  },
  getters: {},
}
