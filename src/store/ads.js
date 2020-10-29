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
  mutations: {},
  actions: {},
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
  },
}
