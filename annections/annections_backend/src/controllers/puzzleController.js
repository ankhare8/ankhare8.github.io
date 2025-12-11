import Puzzle from "../models/puzzle.js";

export const getPuzzle = async (req, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    if (!puzzle)
      return res.status(404).json({ error: "Puzzle not found" });
    // console.log(puzzle)
    res.json(puzzle);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllPuzzles = async (req, res) => {
  const puzzles = await Puzzle.find({});
  res.json(puzzles);
};
