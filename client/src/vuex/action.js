import axios from 'axios'

const actions = {
  getAllArticles ({ commit }) {
    axios.get('http://localhost:3000/api/articles').then((data) => {
      commit('setArticles', data.data.data)
      console.log(data)
    }).catch((err) => {
      console.error(err)
    })
  }
}

export default actions
