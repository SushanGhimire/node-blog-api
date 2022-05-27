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
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log("connected to database...")
);
//

app.use(express.json());

//Route Middleware
app.use("/blogs", blogRouter);
app.use("/user", userRoute);

const port = process.env.HOST_PORT || 3001;

app.listen(port, () => {
  console.log(`conneted to ${port} port..`);
});
