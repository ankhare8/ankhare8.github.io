import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import puzzleRoutes from "./routes/puzzleRoutes.js";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/puzzles", puzzleRoutes);

app.listen(3001, () => console.log("API running on port 3001"));
