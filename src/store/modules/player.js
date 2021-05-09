export default({
    state: {
        players: [{login: 'Player 1'}, {login: 'Player 2'}],
    },
    getters: {
        allPlayers(state){
            return state.players;
        }
    },
    mutations: {
        updatePlayers(state, players){
            state.players = players
        }
    },
    actions: {
        async fetchPlayers(ctx, users){
            const url = 'https://www.mafiaonline.ru/api/api.php?action=info&s=yes&param='
            let res = null
            let players = []
            for (const item of users) {
                res = await fetch(url + Object.values(item)[0])
                res = await res.json()
                if (res.r == 'success'){
                    players.push(
                        {
                            login: res.login,
                            avatar: res.avatar.url,
                            socStatus: res.stat.stat[1] != '-1' ? res.stat.stat[1] : null,
                            immunity: res.stat.stat[0] != '-1' ? res.stat.stat[0] : null,
                            attack: res.stat.stat[3] != '-1' ? res.stat.stat[3] : null,
                            protection: res.stat.stat[2] != '-1' ? res.stat.stat[2] : null,
                        }
                    )
                } else {
                    players.push(
                        {
                            login: Object.values(item)[0],
                            avatar: 'https://st.mafiaonline.ru/images/roles_new/alive/64/unknown_u.png'
                        }
                    )
                }
            }

            ctx.commit('updatePlayers', players)
        },
    },
});