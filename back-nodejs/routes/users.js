import express from "express";
const router = express.Router();
import joi from "@hapi/joi";
import { addUser, verifyUser } from "../models/users.js";

router.post("/login", async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let checkUserLogin = await verifyUser(result.value);
    if (checkUserLogin.error) {
      throw checkUserLogin.message;
    }
    // set session for the logged in user
    req.session.user = {
      name: checkUserLogin.data.name,
      email: checkUserLogin.data.email,
    };
    res.json(checkUserLogin);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const schema = joi.object().keys({
      name: joi.string().min(3).max(45).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let addUserResponse = await addUser(result.value);
    res.json(addUserResponse);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
});

export default router;