const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    sex: { type: String, required: true },
    userdata: {
      likes: {
        books: [
          {
            type: Schema.Types.ObjectId,
            ref: "books",
          },
        ],
        genres: [
          {
            type: String,
          },
        ],
      },
      contributions: {
        books: [
          {
            type: Schema.Types.ObjectId,
            ref: "books",
          },
        ],
        reviews: [
          {
            book: {
              type: Schema.Types.ObjectId,
              ref: "books",
            },
            review: { type: Schema.Types.ObjectId },
          },
        ],
      },
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    status: {
      account: { type: Boolean, required: true, default: true },
      contributions: {
        books: { type: Boolean, required: true, default: true },
        reviews: { type: Boolean, required: true, default: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
