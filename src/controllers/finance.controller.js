const financeService = require("../services/finance.service");
const { recordSchema } = require("../utils/validation");


// I have Added Comments for better understanding of the code and its functionality.


// CREATE
exports.createRecord = async (req, res, next) => {
  try {
    const { error } = recordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const record = await financeService.createRecord(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

// GET
exports.getRecords = async (req, res, next) => {
  try {
    const records = await financeService.getRecords(req.query);

    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateRecord = async (req, res, next) => {
  try {
    const record = await financeService.updateRecord(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE (SOFT DELETE)
exports.deleteRecord = async (req, res, next) => {
  try {
    await financeService.deleteRecord(req.params.id);

    res.json({
      success: true,
      message: "Record deleted (soft delete)",
    });
  } catch (err) {
    next(err);
  }
};

exports.restoreRecord = async (req, res, next) => {
  try {
    const record = await financeService.restoreRecord(req.params.id);

    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};