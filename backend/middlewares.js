require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.checkTokenSetUser = (req, res, next) => {
    const authHeader = req.get("authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) console.log(err);
                if (user) {
                    console.log(user);
                    req.user = user;
                    next();
                } else {
                    res.status(401).json({ message: "expired token" });
                }
            });
        } else {
            res.status(401).json({ message: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "token not found" });
    }
};

exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        const error = new Error("Unauthorized");
        res.status(401);
        next(error);
    }
};
