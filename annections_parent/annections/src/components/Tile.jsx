export default function Tile({ word, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-md border text-center transition-colors duration-200 
        ${selected ? "bg-yellow-300 border-yellow-500" : "bg-white border-gray-300"} 
        hover:bg-yellow-100`}
    >
      {word}
    </button>
  );
}
