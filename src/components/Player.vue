<template>
  <div class="player">
    {{ player.login }}
    <div class="flex-container">
      <span @click="$emit('selection')" class="switcher"></span>
      <div class="flex-col">
        <div class="avatar-container">
          <img v-if="!player.avatar" class="avatar" src="https://st.mafiaonline.ru/images/avatars/nophoto_u.png" width="50" height="50">
          <img v-else class="avatar" :src="player.avatar" width="50" height="50">
        </div>
      </div>
      <div class="flex-col">
        <label>Soc.: <input type="number" v-model.number="player.socStatus"></label>
        <label>Attack: <input type="number" v-model.number="player.attack"></label>
      </div>
      <div class="flex-col">
        <label>Immun.: <input type="number" v-model.number="player.immunity"></label>
        <label>Protect.: <input type="number" v-model.number="player.protection"></label>
      </div>
    </div>
    <div class="damage">
      <span><strong>In: </strong></span>
      <span>Day: <strong class="yellow">{{ inputDailyDamage }}</strong></span>
      <span> | Night: <strong class="red">{{ inputNightDamage }}</strong></span>
      <span> | Maniac: <strong class="purple">{{ inputManiacDamage }}</strong></span>
      <span> | Heal: <strong class="blue">{{ inputTreatment }}</strong></span>
      <br>
      <span><strong>Out: </strong></span>
      <span>Day: <strong class="yellow">{{ outputDailyDamage }}</strong></span>
      <span> | Night: <strong class="red">{{ outputNightDamage }}</strong></span>
      <span> | Maniac: <strong class="purple">{{ outputManiacDamage }}</strong></span>
      <span> | Heal: <strong class="blue">{{ outputTreatment }}</strong></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    player: Object,
    selected: Object,
    rage: Number
  },
  computed: {
    inputDailyDamage: function() {
      if (this.selected && this.selected.socStatus && this.player.immunity && this.selected !== this.player) {
        return Math.round(10 * (+this.selected.socStatus / (+this.selected.socStatus + +this.player.immunity)))
      }
      return '-'
    },
    inputNightDamage: function() {
      if (this.selected && this.selected.attack && this.player.protection && this.selected !== this.player) {
        return Math.round((10 + +this.rage) * (+this.selected.attack / (+this.selected.attack + +this.player.protection)))
      }
      return '-'
    },
    inputManiacDamage: function() {
      if (this.selected && this.selected.attack && this.player.protection && this.selected !== this.player) {
        return Math.round(15 * (+this.selected.attack / (+this.selected.attack + +this.player.protection)))
      }
      return '-'
    },
    inputTreatment: function() {
      if (this.selected && this.selected.attack && this.player.protection && this.selected !== this.player) {
        return Math.round(5 * (+this.selected.attack / (+this.selected.attack + +this.player.protection)))
      }
      return '-'
    },
    outputDailyDamage: function() {
      if (this.selected && this.player.socStatus && this.selected.immunity && this.selected !== this.player) {
        return Math.round(10 * (+this.player.socStatus / (+this.player.socStatus + +this.selected.immunity)))
      }
      return '-'
    },
    outputNightDamage: function() {
      if (this.selected && this.player.attack && this.selected.protection && this.selected !== this.player) {
        return Math.round((10 + +this.rage) * (+this.player.attack / (+this.player.attack + +this.selected.protection)))
      }
      return '-'
    },
    outputManiacDamage: function() {
      if (this.selected && this.player.attack && this.selected.protection && this.selected !== this.player) {
        return Math.round(15 * (+this.player.attack / (+this.player.attack + +this.selected.protection)))
      }
      return '-'
    },
    outputTreatment: function() {
      if (this.selected && this.player.attack && this.selected.protection && this.selected !== this.player) {
        return Math.round(5 * (+this.player.attack / (+this.player.attack + +this.selected.protection)))
      }
      return '-'
    },
  }
}
</script>

<style>
  #app .flex-container{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
  #app .flex-col{
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  #app .player{
    border: 1px solid gray;
    border-radius: 3px;
    padding: 5px;
    margin: 0 5px;
    width: 320px;
    background: white;
    padding-bottom: 0;
    margin-bottom: 10px;
  }
  #app .player.selected .switcher{
    background: #44bd32;
  }
  #app input {
    margin: 5px;
    max-height: 16px !important;
    padding: 0;
    max-width: 30px;
    line-height: 16px;
    border: none;
    border-bottom: 1px solid gray;
    outline: none !important;
    -moz-appearance:textfield;
  }
  #app input::-webkit-outer-spin-button,
  #app input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  #app label{
    text-align: right;
    line-height: 16px;
    font-size: 12px;
  }
  #app .damage{
    font-size: 14px;
    margin: 5px;
    padding:5px;
    border-top: 1px solid grey;
  }
  #app .switcher{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid gray;
    cursor: pointer;
    position: absolute;
    right: -10px;
    top: -30px;
    background: white;
  }
  #app .avatar-container{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 50px;
    border: 1px solid gray;
    overflow: hidden;
  }
  #app .yellow{
    color: #9d7108;
  }
  #app .red{
    color: #b91616;
  }
  #app .purple{
    color: mediumpurple;
  }
  #app .blue{
    color: cornflowerblue;
  }
</style>