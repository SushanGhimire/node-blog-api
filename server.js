const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// get config vars
dotenv.config();

// routes
const userRoute = require("./router/auth");
const blogRouter = require("./router/blogs");

const app = express();
app.use(cors());

// db connection
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database...")
);
//

app.use(express.json());

//Route Middleware
app.use("/blogs", blogRouter);
app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`conneted to 3001 port..`);
});
