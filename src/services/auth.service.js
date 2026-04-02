const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
};

exports.login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Invalid password");
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  return { token };
};