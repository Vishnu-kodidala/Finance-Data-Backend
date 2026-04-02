require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const financeRoutes = require("./routes/finance.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const userRoutes = require("./routes/user.routes");

const { errorHandler } = require("./middleware/error.middleware");

const app = express();

// I have Added Comments for better understanding of the code and its functionality.

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(limiter); // apply globally

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/records", financeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);

// check
app.get("/", (req, res) => {
  res.send("Backend is running..");
});

// Global error handler
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});