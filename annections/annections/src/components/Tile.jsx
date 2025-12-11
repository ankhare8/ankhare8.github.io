export default function Tile({ word, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "p-4 rounded-lg border text-center font-medium select-none",
        "transition-all duration-200 ease-out transform",
        selected ? "bg-blue-500 text-white border-blue-600 scale-105" : 
                   "bg-gray-100 border-gray-300 hover:scale-105 hover:bg-gray-200"
      ].join(" ")}
    >
      {word}
    </button>
  );
}
