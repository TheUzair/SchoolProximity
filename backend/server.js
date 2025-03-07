import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import schoolRoutes from "./routes/schoolRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));