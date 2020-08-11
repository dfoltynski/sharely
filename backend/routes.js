const express = require("express");
const router = express.Router();
const multer = require("multer");

const { checkTokenSetUser } = require("./middlewares");
const {
    registerUserController,
    loginUserController,
    authToken,
    pushPinsToDb,
    listAllMarkups,
    addFriend,
} = require("./controllers");

const storage = multer.diskStorage({
    destination: "./public/",
    filename: (req, file, cb) => {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

router.get("/", (req, res) => {
    res.send("✨Hello!✨");
});
router.post("/register", upload.single("profilePic"), registerUserController);
router.post("/login", loginUserController);
router.post("/push-pins-to-db", pushPinsToDb);
router.post("/add-friend", addFriend);

router.get("/auth-me", checkTokenSetUser, authToken);
router.get("/list-all-markups", listAllMarkups);

module.exports = router;
