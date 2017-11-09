<template lang="html">
<div>
<h1>Article Detail</h1>
  <md-card>
    <md-card-header>
      <div class="md-title">{{article.title}}</div>
      <div class="md-subhead">{{article.author.username}}</div>
    </md-card-header>

    <md-card-actions>
      <md-button @click="edit">Edit</md-button>
      <md-button @click="remove">Delete</md-button>
    </md-card-actions>

    <md-card-content>
      {{article.content}}
    </md-card-content>
  </md-card>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="formUpdate">
    <md-dialog-title>
      Form Update
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
      <md-button class="md-primary" @click="closeDialog('formUpdate')">Cancel</md-button>
      <md-button class="md-primary" @click="doEdit">Update</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      article: {
        title: '',
        author: {
          username: '',
          password: ''
        }
      },
      title: '',
      content: '',
      category: ''
    }
  },
  methods: {
    edit () {
      this.$refs.formUpdate.open()
      this.title = this.article.title
      this.content = this.article.content
      this.category = this.article.category
    },
    doEdit () {
      if (this.title && this.content && this.category) {
        this.$http.put('http://localhost:3000/api/articles/' + this.id, {
          title: this.title,
          content: this.content,
          category: this.category,
          author: localStorage.getItem('token')
        }).then((data) => {
          this.$swal({
            type: 'success',
            text: 'Success to Update'
          })
        }).catch((err) => {
          console.log(err)
          this.$swal({
            type: 'error',
            text: 'Failed to Update'
          })
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Title content category must have value'
        })
      }
    },
    remove () {
      this.$http.delete('http://localhost:3000/api/articles/' + this.id + '/' + localStorage.getItem('token')).then((data) => {
        this.$swal({
          type: 'success',
          text: 'Success to Delete this post'
        })
        this.$router.push('/')
      }).catch((err) => {
        this.$swal({
          type: 'error',
          text: 'Failed to Delete'
        })
        console.error(err)
      })
    },
    getArticleData () {
      this.$http.get('http://localhost:3000/api/articles/' + this.id).then((data) => {
        this.article = data.data.data
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  created () {
    this.getArticleData()
  }
}
</script>

<style lang="css">
</style>
