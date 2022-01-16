import express, { Router } from "express";
const app = express();
const router = Router();

// static routes
router.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  res.render("index.html");
});

router.get("/home", function (req, res) {
  if (req.session.user) {
    return res.render("home.html", { name: req.session.user.name });
  }
  res.redirect("/");
});

export default router