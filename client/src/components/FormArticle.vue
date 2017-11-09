<template lang="html">
<div>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="formArticle">
    <md-dialog-title>
      Form Post
    </md-dialog-title>

    <md-dialog-content>
      <md-input-container>
        <label>Title</label>
        <md-input type="text" v-model="title"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Content</label>
        <md-input type="text" v-model="content"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Category</label>
        <md-input type="text" v-model="category"></md-input>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog('formArticle')">Cancel</md-button>
      <md-button class="md-primary" @click="doPost">Post</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      content: '',
      category: ''
    }
  },
  methods: {
    doPost () {
      if (this.title && this.content && this.category) {
        this.$http.post('http://localhost:3000/api/articles', {
          title: this.title,
          content: this.content,
          category: this.category,
          author: localStorage.getItem('token')
        }).then((data) => {
          this.$swal({
            type: 'success',
            text: 'Success to post'
          })
        }).catch((err) => {
          console.log(err)
          this.$swal({
            type: 'error',
            text: 'Failed to Post'
          })
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Title content category must have value'
        })
      }
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    openDialog (ref) {
      this.$refs[ref].open()
    }
  }
}
</script>

<style lang="css">
</style>
