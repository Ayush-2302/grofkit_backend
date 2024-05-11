require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const User = require("./routes/User");
const mongoDB = require("./db/db");
const cors = require("cors");
mongoDB();
app.use(express.json());
app.use(cors());
app.use("/api/user", User);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
