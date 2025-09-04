const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Example of protected route
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
