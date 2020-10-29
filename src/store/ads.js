import firebase from 'firebase/app'
import 'firebase/database'

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
    ads: [
      {
        title: 'First ad',
        description: 'Hello',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '1212',
      },
      {
        title: 'SEcond ad',
        description: 'Hello',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '121sdf2',
      },
      {
        title: '3 ad',
        description: 'Hello',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: '1212dfg',
      },
    ],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
  },
  actions: {
    async createAd({ commit, getters }, { title, description, promo, imgSrc }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(title, description, getters.user.id, imgSrc, promo)
        const { key } = await firebase
          .database()
          .ref('ads')
          .push(newAd)

        commit('createAd', {
          ...newAd,
          id: key,
        })
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
