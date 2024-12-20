require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const connDB = require("./config/connDB");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

connDB();

app.use(logger);

app.use(require("./middleware/credentials"));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/users"));

app.all("*", (req, res) => {
  res.status = 400;
  if (req.url.includes(".json")) {
    res.json({ message: "no json file found" });
  } else if (req.url.includes("txt")) {
    res.type("txt").send("no file found");
  } else {    
    res.sendFile("./views/404.html", { root: __dirname });
  }
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
