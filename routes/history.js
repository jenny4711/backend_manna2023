const express = require("express");
const router = express.Router();
const db = require("../db");
const History = require("../models/history");
const User = require("../models/users");
const { ensureLoggedIn,ensureCorrectUserOrAdmin } = require("../middleware/auth");

router.get("/msg/:id" ,async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await History.getAll(id);
    console.log(history, "all");
    return res.json({ history });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const history = await History.getById(id);
    return res.json(history);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { user_id, msg } = req.body;
    const history = await History.create(user_id, msg);
    return res.json(history);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const history = await History.getById(req.params.id);
    await history.delete();
    return res.json({ msg: "Deleted it!" });
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id/msg", ensureLoggedIn, async (req, res, next) => {
  try {
    const history = await History.getById(req.params.id);
    history.msg = req.body.msg;
    await history.update();
    return res.json(history);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;


