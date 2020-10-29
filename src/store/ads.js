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
          key,
        }))

        commit('loadAds', ads)
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
    myAds(state) {
      return state.ads
    },
    adById(state) {
      return id => state.ads.find(ad => ad.id === id)
    },
  },
}
