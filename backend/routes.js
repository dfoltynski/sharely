const express = require("express");
const router = express.Router();

const { checkTokenSetUser } = require("./middlewares");
const {
    registerUserController,
    loginUserController,
    authToken,
    pushPinsToDb,
} = require("./controllers");

router.post("/register", registerUserController);
router.post("/login", loginUserController);

router.get("/auth-me", checkTokenSetUser, authToken);

router.post("/post-pins-to-db", pushPinsToDb);

module.exports = router;
