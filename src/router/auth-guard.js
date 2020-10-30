import store from '../store/index'

export default function(to, from, next) {
  if (store.getters.isUserLoggedIn) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
