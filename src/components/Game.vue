<template>
 <tr @click="$emit('selectionGame')" class="game">
   <td><a target="_blank" :href="'https://www.mafiaonline.ru/log/' + game.id">{{game.id}}</a></td>
   <td>{{game.start}}</td>
   <td>{{game.player_count}}</td>
   <td>
     <span v-for="(user, index) in game.users" :key="index">{{ Object.values(user)[0] }}<template v-if="index < game.users.length - 1">, </template></span>
   </td>
 </tr>
</template>

<script>
export default {
  name: 'Game',
  props: {
    game: Object,
    selectedGame: Object,
  },
}
</script>

<style>
  #app tr{
    line-height: 30px;
    border-radius: 10px;
    overflow: hidden;
  }
  #app tr:not(:first-child){
    cursor: pointer;
  }
  #app td, #app th{
    border: 1px solid gray;
    padding-left: 5px;
    padding-right: 5px;
  }
  #app td:first-child, #app th:first-child{
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  #app td:last-child, th:last-child{
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  #app .game:hover{
    background: #282e37;
  }
  #app .game.selected{
    background: #282f39;
  }
</style>