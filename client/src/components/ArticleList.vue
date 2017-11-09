<template lang="html">
<div>
<h1>Article List</h1>
  <md-card v-for="article in articles" :key="article._id">
    <md-card-header>
      <div class="md-title">{{article.title}}</div>
      <div class="md-subhead">{{article.author.username}}</div>
    </md-card-header>

    <md-card-actions>
      <md-button @click="redirectTo(article._id)">Show Details</md-button>
    </md-card-actions>

    <md-card-content>
      {{article.content}}
    </md-card-content>
  </md-card>
</div>
</template>

<script>
export default {
  methods: {
    redirectTo (id) {
      this.$router.push('/details/' + id)
    }
  },
  computed: {
    articles () {
      return this.$store.state.articles
    }
  }
}
</script>

<style lang="css">
</style>
