const botNickname = '[AI] The best bot';
const humanNickname = 'John Cena';

export default  {
    postScore: function(score, time, isBot){
        fetch(`https://leaderboard.lp1.eu/api/${isBot ? botNickname : humanNickname}/${score}/${time}`);
    }
};