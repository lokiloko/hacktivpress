import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex)

const initialState = {
  loggedIn: false,
  articles: ''
}

export default new Vuex.Store({
  state: {
    ...initialState
  },
  mutations,
  actions
})
