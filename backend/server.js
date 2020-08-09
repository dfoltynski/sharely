require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path"); // later for use react here
const routes = require("./routes");
const helmet = require("helmet");
const mongoSanitize = require("mongo-sanitize");
const xssSanitize = require("xss");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: true,
};
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500,
});

// app.use(mongoSanitize());
// app.use(xssSanitize());
app.use(helmet());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options("*", cors(corsOptions));
app.use(speedLimiter);

app.use(
    "/api",
    rateLimiter({
        windowMs: 25 * 60 * 1000, // 25 min
        max: 500,
        message: {
            error:
                "Too many request! I am done with it, try again after 25 min",
        },
    }),
    routes
);

mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log(err);
        else console.log(`connected to database`);
    }
);

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`server is listening on port ${port}`);
});
