import { useState } from "react";
import Tile from "./Tile.jsx";

export default function TileGrid({ words }) {
  const [selected, setSelected] = useState([]);

  const toggle = (word) => {
    setSelected(prev =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {words.map(word => (
        <Tile key={word} word={word} />
      ))}
    </div>
  );
}
