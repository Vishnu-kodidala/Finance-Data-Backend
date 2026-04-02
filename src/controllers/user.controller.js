const prisma = require("../config/db");

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.updateUserRole = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role: req.body.role },
  });

  res.json(user);
};

exports.toggleUserStatus = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { isActive: req.body.isActive },
  });

  res.json(user);
};