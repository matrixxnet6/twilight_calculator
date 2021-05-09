export default({
    state: {
        games: [],
    },
    getters: {
        allGames(state){
            return state.games;
        }
    },
    mutations: {
        updateGames(state, games){
            state.games = games
        }
    },
    actions: {
        async fetchGames(ctx){
            const res = await fetch('https://www.mafiaonline.ru/api/api.php?action=log&param=current')
            let games = await res.json()

            ctx.commit('updateGames', games)
        },
    },
});