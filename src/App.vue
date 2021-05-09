<template>
  <div id="app">
    <h1>Twilight Calculator</h1>
    <hr>
    <Calc
      :players="allPlayers"
      :games="allGames"
    />
  </div>
</template>

<script>
import Calc from '@/components/Calc'
export default {
  name: 'App',
  components: {
    Calc
  },
  computed: {
    allPlayers(){
      return this.$store.getters.allPlayers;
    },
    allGames(){
      return this.$store.getters.allGames;
    }
  },
  mounted(){
    this.$store.dispatch('fetchGames')
    setInterval(() => this.$store.dispatch('fetchGames'),10000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
  background: #2f3640;
  padding: 30px 15px;
}
#app a{
  font-weight: bold !important;
  color: #fff !important;
}
</style>
