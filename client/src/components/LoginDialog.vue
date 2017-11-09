<template lang="html">
<div>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
    <md-dialog-title>
      Login Form
    </md-dialog-title>

    <md-dialog-content>
      <md-input-container>
        <label>Username</label>
        <md-input type="text" v-model="username"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog('dialog1'); openDialog('dialog2')">Register</md-button>
      <md-button class="md-primary" @click="doLogin">Login</md-button>
    </md-dialog-actions>
  </md-dialog>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog2">
    <md-dialog-title>
      Register Form
    </md-dialog-title>

    <md-dialog-content>
      <md-input-container>
        <label>Username</label>
        <md-input type="text" v-model="username"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog('dialog2'); openDialog('dialog1')">Login</md-button>
      <md-button class="md-primary" @click="doRegister">Register</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    doLogin () {
      if (this.username && this.password) {
        this.$http.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password
        }).then((data) => {
          this.closeDialog('dialog1')
          localStorage.setItem('token', data.data.token)
          this.$store.commit('toggleLog')
          this.$swal({
            type: 'success',
            text: 'Success Login'
          })
        }).catch((err) => {
          console.log(err)
          this.$swal({
            type: 'error',
            text: 'Failed to Login'
          })
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Username and Password must have value'
        })
      }
    },
    doRegister () {
      if (this.username && this.password) {
        this.$http.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          password: this.password
        }).then((data) => {
          this.closeDialog('dialog1')
          this.openDialog('dialog2')
          this.$swal({
            type: 'success',
            text: 'Success Register, Login now'
          })
        }).catch((err) => {
          console.error(err)
          this.$swal({
            type: 'error',
            text: 'Failed to Register'
          })
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Username and Password must have value'
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
