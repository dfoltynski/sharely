const mongoose = require("mongoose");
const { strict, string } = require("joi");
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true,
};

const UserSchema = new Schema(
    {
        name: requiredString,
        email: requiredString,
        password: requiredString,
        avatar_url: { type: String },
        friends: [],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const UserOpinionsSchema = new Schema(
    {
        markup: [],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const MarkupLocationSchema = new Schema(
    {
        markup: {},
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const User = mongoose.model("user", UserSchema);
const UserOpinions = mongoose.model("user_opinions", UserOpinionsSchema);
const MarkupLocation = mongoose.model("markup_locations", MarkupLocationSchema);

module.exports = {
    User,
    UserOpinions,
    MarkupLocation,
};
