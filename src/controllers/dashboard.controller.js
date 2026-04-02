const dashboardService = require("../services/dashboard.service");

exports.getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};