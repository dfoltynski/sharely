require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path"); // later for use react here
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: true,
};

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options("*", cors(corsOptions));

app.use("/api", routes);

mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log(err);
        else console.log(`connected to database`);
    }
);

app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`server is listening on port ${port}`);
});
