const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

router.get(
  "/admin",
  authMiddleware,
  allowRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

router.get(
  "/analyst",
  authMiddleware,
  allowRoles("ANALYST", "ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Analyst" });
  }
);

router.get(
  "/viewer",
  authMiddleware,
  allowRoles("VIEWER", "ANALYST", "ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Viewer" });
  }
);

module.exports = router;