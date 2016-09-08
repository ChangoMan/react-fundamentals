var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo (username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars (repos) {
    return repos.data.reduce(function (prev, current) {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData (player) {
    return getRepos(player.login) //get username
        .then(getTotalStars) // get how many stars they have
        .then(function (totalStars) {
            return {
                // then return an object with number of followers and stars
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores (players) {
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var githubHelpers = {
    getPlayersInfo : function (players) {
        // fetch some data from Github
        return axios.all(players.map(function (username) {
            return getUserInfo(username)
        })).then(function (info) {
            // console.log(info);
            return info.map(function (user) {
                return user.data;
            })
        }).catch(function (err) {
            console.warn('Error in getPlayersInfo', err);
        })
    },
    battle: function (players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData]) // axios.all contunues when both playerOneData and playerTwoData promises resolve
            .then(calculateScores)
            .catch(function (err) {
                console.warn('Error in getPlayersInfo ', err)
            })

    }
}

module.exports = githubHelpers;