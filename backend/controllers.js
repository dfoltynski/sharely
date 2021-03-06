require("dotenv").config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserOpinions, MarkupLocation } = require("./models");

exports.authToken = (req, res, next) => {
    const { name, email } = req.user;
    res.json({ name, email });
};

const saltRounds = 12;
const validationSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    avatar_url: Joi.string(),
});

const createAndSendToken = (user, res) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
    };

    jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "10h" },
        (error, token) => {
            if (error) console.log(error);
            res.json({ token });
        }
    );
};

exports.registerUserController = async (req, res) => {
    const dataValidationResult = validationSchema.validate(req.body);
    if (!dataValidationResult.hasOwnProperty("error")) {
        const email = await User.findOne({ email: req.body.email });
        if (!email) {
            createUser = () => {
                // const url = req.protocol + "://" + req.get("host");
                const { name, email, password } = req.body;

                const hashedPassword = bcrypt.hashSync(password, saltRounds);
                return User.create({
                    name,
                    email,
                    password: hashedPassword,
                    // avatar_url: url + "/public/" + req.file.filename,
                }).then((docUser) => {
                    console.log(docUser);
                    return docUser;
                });
            };

            createUserOpinions = (userId) => {
                return UserOpinions.create(userId).then((docUserOpinions) => {
                    console.log(docUserOpinions);
                    return docUserOpinions;
                });
            };

            let user = await createUser();
            let userOpinions = await createUserOpinions({ user: user._id });

            createAndSendToken(user, res);
        } else {
            res.status(401).json({ message: "this user is already exist" });
        }
    } else {
        res.status(401).json({ message: "incorrect username or email" });
    }
};

exports.loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email });

    if (dbUser) {
        const match = bcrypt.compareSync(password, dbUser.password);

        if (match) {
            createAndSendToken(dbUser, res);
        } else {
            res.status(400).json({ message: "incorrect email or password" });
        }
    } else {
        res.status(401).json({ message: "this user doesnt exist" });
    }
};

exports.pushPinsToDb = async (req, res) => {
    const { email, name, where, lnglats, comments, stars } = req.body;

    // return MarkupLocation.create({
    // markup: [{ lnglats, comments, stars }],
    // }).then((docMarkup) => {
    // return docMarkup;
    // });
    await MarkupLocation.updateMany(
        {},
        {
            $addToSet: {
                markup: { email, name, where, lnglats, comments, stars },
            },
        },
        { new: true, useFindAndModify: false }
    );

    res.status(200);
};

exports.listAllMarkups = async (req, res) => {
    const info = await MarkupLocation.find();
    res.status(200).send({ info });
};

exports.addFriend = async (req, res) => {
    const { userEmail, friendsEmail } = req.body;

    await User.findOneAndUpdate(
        { email: userEmail },
        {
            $addToSet: {
                friends: friendsEmail,
            },
        },
        { new: true, useFindAndModify: false }
    );

    res.status(200);
};
