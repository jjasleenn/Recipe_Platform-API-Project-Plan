import express from "express";
import reciperoutes from "./api/v1/routes/reciperoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./api/v1/swagger/swagger";
import { startscheduler } from "./api/v1/utils/Scheduler";

const app = express();
app.use(express.json());

app.use("/api/v1/recipes", reciperoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send("Server is running with a scheduler!");
});

// Start the scheduler
startscheduler();


export default app;

