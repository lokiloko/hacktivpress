const mutations = {
  toggleLog (state) {
    if (localStorage.getItem('token')) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  },
  setArticles (state, payload) {
    state.articles = payload
  }
}

export default mutations
