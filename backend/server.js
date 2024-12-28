import express from "express";

import autRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/v1/auth", autRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
