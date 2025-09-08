const express = require("express");
const router = express.Router();

router.get("/first_template", (req, res) => {
  res.render("first_view");
});

module.exports = router;
