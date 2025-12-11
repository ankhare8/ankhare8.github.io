import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  category: String,
  words: [String],
  difficulty: Number
});

const PuzzleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  groups: [GroupSchema]
});

export default mongoose.model("Puzzle", PuzzleSchema);
