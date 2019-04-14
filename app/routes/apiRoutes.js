var friendsData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });

    app.post("/api/friends", function(req, res) {
        var newFriendInfo = req.body;
        var newFriendScores = newFriendInfo.scores;

        var bestFriendName = "";
        var bestFriendAvatar = "";
        var bestFriendScore = 100;

        for (var i = 0; i < friendsData.length; i++) {
            var absDiff = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                absDiff += Math.abs(friendsData[i].scores[j] - newFriendScores[j]);
            }

            if (absDiff < bestFriendScore) {
                bestFriendScore = absDiff;
                bestFriendName = friendsData[i].friendName;
                bestFriendAvatar = friendsData[i].friendAvatar;
            }

        }

        friendsData.push(req.body);

        res.json({status: 'OK', bestFriendName: bestFriendName, bestFriendAvatar: bestFriendAvatar});

    });
};
