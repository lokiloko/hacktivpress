<template lang="html">
<div>
  <md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title" style="flex: 1">HacktivPress</h2>
    <md-button @click="openSearch">Search by Category</md-button>
    <md-button class="" v-if="!isLogin" id="custom" @click="openLogin">
      Login
    </md-button>
    <span v-else>
      <md-button class="" @click="openForm">
        New Articles
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
  <router-view/>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginDialog from '@/components/LoginDialog'
import ArticleList from '@/components/ArticleList'

export default {
  components: {
    LoginDialog,
    ArticleList
  },
  methods: {
    openSearch () {
      console.log('aa')
    },
    openForm () {
      console.log('aa')
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    openLogin () {
      this.$refs.login.openDialog('dialog1')
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
