const express = require("express");
const router = express.Router();
const path = require("path");

router.route("^/$|index(.html)?").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.route("/new-page(.html)?").get((req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/");
});

module.exports = router;
