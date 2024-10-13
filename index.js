const dotenv = require("dotenv");
const connectDB = require("./connectDB");
const locationRoutes = require("./routes/location.routes");
const itemRoutes = require("./routes/item.routes");
const express = require("express");
const authRoutes = require("./routes/user.routes");
const cors = require("cors");

dotenv.config();
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
const app = express();
//Todo update with only allowed origins allowing wild card for testing
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
