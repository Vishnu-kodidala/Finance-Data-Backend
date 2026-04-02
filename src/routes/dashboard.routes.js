const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

router.get(
  "/summary",
  authMiddleware,
  allowRoles("ANALYST", "ADMIN"),
  dashboardController.getSummary
);

module.exports = router;