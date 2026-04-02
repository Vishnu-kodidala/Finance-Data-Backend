const prisma = require("../config/db");

// I have Added Comments for better understanding of the code and its functionality.

// CREATE
exports.createRecord = async (data, userId) => {
  return prisma.financeRecord.create({
    data: {
      ...data,
      date: new Date(data.date),
      userId,
    },
  });
};

// GET (exclude deleted)
exports.getRecords = async (filters) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  return prisma.financeRecord.findMany({
    where: {
      isDeleted: false,

      type: filters.type,
      category: filters.category,

      notes: filters.search
        ? { contains: filters.search }
        : undefined,

      date: {
        gte: filters.startDate
          ? new Date(filters.startDate)
          : undefined,
        lte: filters.endDate
          ? new Date(filters.endDate)
          : undefined,
      },
    },
    skip,
    take: limit,
    orderBy: { date: "desc" },
  });
};

// UPDATE
exports.updateRecord = async (id, data) => {
  return prisma.financeRecord.update({
    where: { id },
    data,
  });
};

// SOFT DELETE
exports.deleteRecord = async (id) => {
  return prisma.financeRecord.update({
    where: { id },
    data: { isDeleted: true },
  });
};

// RESTORE (if needed)
exports.restoreRecord = async (id) => {
  return prisma.financeRecord.update({
    where: { id },
    data: { isDeleted: false },
  });
};