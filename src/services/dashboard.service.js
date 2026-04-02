const prisma = require("../config/db");

// I have Added Comments for better understanding of the code and its functionality.

exports.getSummary = async () => {
  // Fetch all records once
  const records = await prisma.financeRecord.findMany();

  // Total Income & Expense
  let totalIncome = 0;
  let totalExpense = 0;

  // Category totals
  const categoryMap = {};

  // Monthly trends
  const monthMap = {};

  records.forEach((r) => {
    // Income / Expense
    if (r.type === "INCOME") totalIncome += r.amount;
    else totalExpense += r.amount;

    // Category totals
    if (!categoryMap[r.category]) categoryMap[r.category] = 0;
    categoryMap[r.category] += r.amount;

    // Monthly trends
    const month = new Date(r.date).toISOString().slice(0, 7); // YYYY-MM

    if (!monthMap[month]) monthMap[month] = 0;
    monthMap[month] += r.amount;
  });

  // Convert category map → array
  const categoryTotals = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    total: categoryMap[cat],
  }));

  // Convert month map → array
  const monthlyTrends = Object.keys(monthMap).map((m) => ({
    month: m,
    total: monthMap[m],
  }));

  // Recent transactions
  const recent = await prisma.financeRecord.findMany({
    orderBy: { date: "desc" },
    take: 5,
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categoryTotals,
    monthlyTrends,
    recentTransactions: recent,
  };
};