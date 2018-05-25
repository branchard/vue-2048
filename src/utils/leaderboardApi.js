const botNickname = '[AI] The best bot';
const humanNickname = 'John Cena';

export default  {
    postScore: function(score, time, isBot){
        fetch(`https://leaderboard.lp1.eu/api/${isBot ? botNickname : humanNickname}/${score}/${time}`);
    },
    getLeaderbord: function(){
        return new Promise((resolve, reject) => {
            fetch('https://leaderboard.lp1.eu/api/json').then(function(response) {
                return response.json();
            }).then((leaderboard) => {
                // filter leaderboard
                let filteredLeaderboard = leaderboard.filter(entry => {
                    return entry.nickname &&
                        entry.nickname != '' && 
                        entry.score &&
                        entry.score != '' &&
                        !isNaN(entry.score) &&
                        entry.time &&
                        entry.time != '' &&
                        !isNaN(entry.time);
                });

                let sortedLeaderboard = filteredLeaderboard.sort((a, b) => {
                    return b.score - a.score;
                });

                // keep only 100 first
                let leaderboardWithRanks = sortedLeaderboard.slice(0, 100).map((entry, index) => {
                    entry.rank = index + 1;
                    return entry;
                });

                resolve(leaderboardWithRanks);
            });
        })
    },
};