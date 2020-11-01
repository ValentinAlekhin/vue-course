import Vue from 'vue'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModal from './views/shared/BuyModal.vue'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('BuyModal', BuyModal)

firebase.initializeApp({
  apiKey: 'AIzaSyBq1ZTo2hn5l5G62k_wNvoSsYNhWDqiiAk',
  authDomain: 'vue-course-6e886.firebaseapp.com',
  databaseURL: 'https://vue-course-6e886.firebaseio.com',
  projectId: 'vue-course-6e886',
  storageBucket: 'vue-course-6e886.appspot.com',
  messagingSenderId: '894436413043',
  appId: '1:894436413043:web:c9581c62e4651c87a36406',
  measurementId: 'G-D8FT4MLNTL',
})

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
})
