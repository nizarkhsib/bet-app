const { authJwt } = require("../middlewares");
const controller = require("../controllers/friendRequest.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Send friend request
    /**
     * Body {from : "user A" , "to": "user B", "status" : "pending, accepted, rejected" }
     */
    app.post("/api/friends/send-request", [authJwt.verifyToken], controller.sendRequest);

    // /api/friends/my-friend-requests
    app.get("/api/friends/my-sent-requests/:username", [authJwt.verifyToken], controller.findSentRequests);
};
