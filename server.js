const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb+srv://Hari:Hari2005@cloud.yodneiv.mongodb.net/kec";

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const postsRoute = require("./routes/posts");
app.use("/api/posts", postsRoute); 

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
