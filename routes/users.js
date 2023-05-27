const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const jsonschema = require("jsonschema");
const { createToken } = require("../helpers/tokens");








// getall user admin

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll();
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

// register
router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    const token = createToken(user);
    console.log(user);

    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ExpressError("email and password require", 400);
    }
    const result = await db.query(
      `SELECT email,password 
    FROM users
    WHERE email=$1
    `,
      [email]
    );

    const user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email }, SECRET_KEY);
        return res.json({ message: "Logged in !", token });
      }
    }
    throw new ExpressError("Invalid usermane/password!", 400);
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

router.get("/by/:email", async (req, res, next) => {
  try {
    console.log(req.params)
    const result=await User.getByEmail(req.params.email);
    return res.json({result})

 
  } catch (e) {
    return next(e);
  }
});

router.get("/search/q",async(req,res,next)=>{
  try{
    console.dir(req.path)
    console.log(req.params.q,'qqq')

    const result=await User.getByEmail(req.params.name)
  
    return res.json(result.rows)
  }catch(e){
    return next(e)
  }

})

router.delete("/:id", async (req, res, next) => {
  try {
    await User.deleteById(req.params.id);
    return res.json({ msg: "deleted it" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;

