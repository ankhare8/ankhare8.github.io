export default function Tile({ word, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "p-8 rounded-xl border text-center select-none uppercase font-bold text-xs md:text-sm",
        "transition-all duration-200 ease-out transform",
        selected ? "bg-emerald-800 text-white border-emerald-600 scale-105" : 
                   "bg-emerald-50 border-emerald-300 hover:scale-105 hover:bg-emerald-200"
      ].join(" ")}
    >
      {word}
    </button>
  );
}
