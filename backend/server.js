import express from "express";
import dotenv from "dotenv";

import autRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use("/api/v1/auth", autRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
