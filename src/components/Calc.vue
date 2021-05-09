<template>
  <div>
    <div class="container">
      <label class="rage">
        Rage:
        <select name="rage" id="rage" v-model.number="rage">
          <option value="0">No</option>
          <option value="5">7</option>
          <option value="12.5">12 (1 maf)</option>
          <option value="3.125">12 (2 maf)</option>
        </select>
      </label>
    </div>
    <div class="container">
      <Player
          v-for='(player, index) in players'
          :key='index'
          :player='player'
          :rage='rage'
          :selected="selected"
          :class="{selected: (selected === player)}"
          @selection="selectPlayer(player)"
      />
    </div>
    <h2>Current Games</h2>
    <table>
      <tr>
        <th>id</th>
        <th>Start</th>
        <th>Players count</th>
        <th>Players</th>
      </tr>
      <Game
          v-for='game in twilightGames'
          :key='game.id'
          :game='game'
          :selectedGame="selectedGame"
          :class="{selected: selectedGame && (selectedGame.id === game.id)}"
          @selectionGame="selectGame(game)"
      />
    </table>
  </div>
</template>

<script>
import Player from '@/components/Player'
import Game from '@/components/Game'
export default {
  name: 'Calc',
  props: ['players', 'games'],
  data: () => ({
    selected: null,
    selectedGame: null,
    rage: 0,
  }),
  components: {
    Player,
    Game
  },
  methods: {
    selectPlayer: function (player) {
      this.selected = player
    },
    selectGame: function (game) {
      this.selectedGame = game
      this.$store.dispatch('fetchPlayers', game.users)
      this.rage = 0
      this.selected = null
    }
  },
  computed: {
    twilightGames: function () {
      if(this.games && this.games.games) {
        return this.games.games.filter(function (game) {
          return game.ul === 'ul3'
        })
      }
      return null;
    },
  },
  mounted(){
    this.selected = this.players[0]
  }
}
</script>

<style>
  #app .container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1100px;
    margin: 0 auto;
    color: #2c3e50;
    padding-top: 30px;
  }
  #app table{
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    border-spacing: 0 5px;
    border-collapse: separate;
  }
  #app .rage{
    color: white;
    font-size: 16px;
  }
  #app .rage select {
    width: 130px;
    height: 30px;
  }
</style>