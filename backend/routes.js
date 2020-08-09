const express = require("express");
const router = express.Router();

const { checkTokenSetUser } = require("./middlewares");
const {
    registerUserController,
    loginUserController,
    authToken,
    pushPinsToDb,
    listAllMarkups,
} = require("./controllers");

router.post("/register", registerUserController);
router.post("/login", loginUserController);

router.get("/auth-me", checkTokenSetUser, authToken);

router.post("/push-pins-to-db", pushPinsToDb);
router.get("/list-all-markups", listAllMarkups);

module.exports = router;
