<template lang="html">
<div>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="search">
    <md-dialog-title>
      Search By Category
    </md-dialog-title>

    <md-dialog-content>
      <md-input-container>
        <label>Search</label>
        <md-input type="text" v-model="search"></md-input>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="doSearch">Search</md-button>
      <md-button class="md-primary" @click="closeSearch">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
  <md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1" @click="redirectToHome">HacktivPress</h2>
    <md-button @click="openSearch">Search by Category</md-button>
    <md-button class="" v-if="!isLogin" id="custom" @click="openLogin">
      Login
    </md-button>
    <span v-else>
      <md-button class="" @click="openForm">
        New Articles
      </md-button>
      <md-button class="" @click="doSearchAuthor">
        My Articles
      </md-button>
      <md-button class="" @click="doLogout">
        Logout
      </md-button>
    </span>
  </md-toolbar>
  <md-sidenav class="md-left" ref="leftSidenav">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
  </md-sidenav>
  <LoginDialog ref="login"/>
  <FormArticle ref="insert"/>
  <router-view/>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginDialog from '@/components/LoginDialog'
import ArticleList from '@/components/ArticleList'
import FormArticle from '@/components/FormArticle'

export default {
  components: {
    LoginDialog,
    ArticleList,
    FormArticle
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    openSearch () {
      this.$refs.search.open()
    },
    closeSearch () {
      this.$refs.search.close()
    },
    openForm () {
      this.$refs.insert.openDialog('formArticle')
    },
    redirectToHome () {
      this.$router.push('/')
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    openLogin () {
      this.$refs.login.openDialog('dialog1')
    },
    doSearch () {
      this.$http.get('http://localhost:3000/api/articles/category/' + this.search).then((data) => {
        console.log(data.data.data)
        this.$store.commit('setArticles', data.data.data)
        this.$swal({
          type: 'success',
          text: 'Search Success'
        })
      }).catch((err) => {
        console.error(err)
        this.$swal({
          type: 'error',
          text: 'Search Failed'
        })
      })
    },
    doSearchAuthor () {
      this.$http.get('http://localhost:3000/api/articles/author/' + localStorage.getItem('token')).then((data) => {
        console.log(data.data.data)
        this.$store.commit('setArticles', data.data.data)
        this.$swal({
          type: 'success',
          text: 'Search Success'
        })
      }).catch((err) => {
        console.error(err)
        this.$swal({
          type: 'error',
          text: 'Search Failed'
        })
      })
    },
    doLogout () {
      localStorage.removeItem('token')
      this.$store.commit('toggleLog')
      this.$router.push('/')
      this.$swal({
        type: 'success',
        text: 'Logout Success'
      })
    },
    ...mapActions([
      'getAllArticles'
    ])
  },
  computed: {
    isLogin () {
      return this.$store.state.loggedIn
    }
  },
  created () {
    this.getAllArticles()
  }
}
</script>

<style lang="css">
</style>
