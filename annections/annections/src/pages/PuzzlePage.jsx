import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPuzzle } from "../api/puzzle.js";
import TileGrid from "../components/TileGrid.jsx";

export default function PuzzlePage() {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    fetchPuzzle(id).then(setPuzzle);
  }, [id]);

  if (!puzzle) return <div>Loading...</div>;

  return (
    
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{puzzle.title}</h1>
      <TileGrid words={puzzle.groups.flatMap(g => g.words)} />
    </div>
  );
}


