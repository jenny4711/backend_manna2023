const express = require("express");
const app = express();
const cors=require('cors')
const ExpressError = require("./expressError");




app.use(cors())
app.use(express.json());

const routes = require("./routes/users");

const mRouters = require("./routes/history");
const aRouters = require("./routes/auth");

app.use("/", routes);
app.use("/history", mRouters);
app.use("/auth", aRouters);

app.use(function (req, res, next) {
  const err = new ExpressError("NOT FOUND", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
