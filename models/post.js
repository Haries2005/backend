const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ this is correct
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      name: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
