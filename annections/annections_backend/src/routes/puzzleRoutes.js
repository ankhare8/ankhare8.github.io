import express from "express";
import { getPuzzle, getAllPuzzles } from "../controllers/puzzleController.js";

const router = express.Router();

router.get("/", getAllPuzzles);
router.get("/:id", getPuzzle);

export default router;
