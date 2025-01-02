import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import autRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use("/api/v1/auth", autRoutes);
app.use("/api/v1/movie", movieRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
