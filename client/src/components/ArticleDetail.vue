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
      }
    }
  },
  methods: {
    edit () {
      console.log('dd')
    },
    remove () {
      console.log('ee')
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
