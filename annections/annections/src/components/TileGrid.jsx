import Tile from "./Tile.jsx";

export default function TileGrid({ words, selected, onToggle }) {
  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {words.map(word => (
        <Tile
          key={word}
          word={word}
          selected={selected.includes(word)}
          onClick={() => onToggle(word)}
        />
      ))}
    </div>
  );
}
