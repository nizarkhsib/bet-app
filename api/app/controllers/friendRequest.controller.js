const db = require("../models");
const FriendRequest = db.friendRequest;

/**
 * Used to add a friend request
 */
exports.sendRequest = (req, res) => {

    const friendRequest = new FriendRequest({
        from: req.body.from,
        to: req.body.to,
        status: req.body.status
    });

    FriendRequest.findOne({
        from: req.body.from,
        to: req.body.to,
        status: req.body.status
    }).exec(
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                return res.status(400).send({ message: "Bad request. Friend request already sent." });
            }

            friendRequest
                .save(friendRequest)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the friend request."
                    });
                });
        }
    )
};

/**
 * 
 */
exports.findSentRequests = (req, res) => {

    FriendRequest.find({
        from: req.params.username
    }).exec(
        (err, data) => {
            console.log('req.params.from', req.params.from);
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!data) {
                return res.status(404).send({ message: "Not friend request found." });
            }

            return res.send(data);
        })
};