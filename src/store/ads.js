import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

class Ad {
  constructor(
    title,
    description,
    ownerId,
    promo = false,
    imgSrc = '',
    id = null
  ) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imgSrc = imgSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload
    },
    updateAd(state, { titel, description, id }) {
      const ad = state.ads.find(el => el.id == id)

      ad.title = titel
      ad.description = description
    },
  },
  actions: {
    async createAd({ commit, getters }, { title, description, promo, image }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(title, description, getters.user.id, promo)
        const { key } = await firebase
          .database()
          .ref('ads')
          .push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await firebase
          .storage()
          .ref(`ads/${key}${imageExt}`)
          .put(image)
        const imgSrc = await fileData.ref.getDownloadURL()
        await firebase
          .database()
          .ref('ads')
          .child(key)
          .update({ imgSrc })

        commit('createAd', {
          ...newAd,
          id: key,
          imgSrc,
        })
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
    async fetchAds({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const fbVal = await firebase
          .database()
          .ref('ads')
          .once('value')
        const ads = Object.entries(fbVal.val()).map(([key, value]) => ({
          ...value,
          id: key,
        }))

        commit('loadAds', ads)
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
    async updateAd({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase
          .database()
          .ref('ads')
          .child(id)
          .update({ title, description })

        commit('updateAd', { title, description, id })
        commit('setLoading', false)
      } catch ({ message }) {
        commit('setLoading', false)
        commit('setError', message)
        throw new Error(message)
      }
    },
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds(state, getters) {
      return state.ads.filter(ad => ad.ownerId === getters.userId)
    },
    adById(state) {
      return id => state.ads.find(ad => ad.id === id)
    },
  },
}
