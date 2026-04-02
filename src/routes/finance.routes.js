const express = require("express");
const router = express.Router();

const financeController = require("../controllers/finance.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// I have Added Comments for better understanding of the code and its functionality.

// Create (Analyst + Admin)
router.post(
  "/",
  authMiddleware,
  allowRoles("ANALYST", "ADMIN"),
  financeController.createRecord
);

// Read(All roles)
router.get("/", authMiddleware, financeController.getRecords);

// Update(Analyst + Admin)
router.put(
  "/:id",
  authMiddleware,
  allowRoles("ANALYST", "ADMIN"),
  financeController.updateRecord
);

// Delete (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  financeController.deleteRecord
);

router.put(
  "/restore/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  financeController.restoreRecord
);

module.exports = router;