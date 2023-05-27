"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/users");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const ExpressError = require("../expressError")



router.post("/token", async function (req, res, next) {
  try {
    

    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});




router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new ExpressError(errs);
    }

    const newUser = await User.register({ ...req.body});
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;


// jacob81@gmail.com / jenny4711

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg0ODExMjc0fQ.HbcdIoDshcc_uMm4PczgRqcwhekI3E3ywUbZZJW1b20"
// }