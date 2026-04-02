const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

router.get("/", authMiddleware, allowRoles("ADMIN"), userController.getUsers);

router.put(
  "/:id/role",
  authMiddleware,
  allowRoles("ADMIN"),
  userController.updateUserRole
);

router.put(
  "/:id/status",
  authMiddleware,
  allowRoles("ADMIN"),
  userController.toggleUserStatus
);

module.exports = router;