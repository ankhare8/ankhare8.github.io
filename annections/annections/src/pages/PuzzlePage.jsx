import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPuzzle } from "../api/puzzle.js";
import TileGrid from "../components/TileGrid.jsx";
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");


export default function PuzzlePage() {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState(null);

  const [boardWords, setBoardWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const gameComplete = solvedGroups.length === 4;


  // This runs no matter what — OK
  useEffect(() => {
    fetchPuzzle(id).then(puz => {
      setPuzzle(puz);

      const allWords = puz.groups.flatMap(g => g.words);
      const shuffled = allWords.sort(() => Math.random() - 0.5);
      setBoardWords(shuffled);
    });
  }, [id]);

  // This also runs every time — OK
  useEffect(() => {
    if (selected.length === 4) {
      setTimeout(checkSelection, 300);
    }
  }, [selected]);

  // Helper to check answers
  const groupsByWord = new Map(
    puzzle?.groups.flatMap(g => g.words.map(w => [w, g])) || []
  );

  const toggleWord = (word) => {
    if (!puzzle) return; // puzzle not loaded yet but all hooks still run

    setSelected(prev =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const checkSelection = () => {
    if (!puzzle) return;

    if (selected.length !== 4) return;

    const group = groupsByWord.get(selected[0]);
    const isCorrect = group.words.every(w => selected.includes(w));

    if (isCorrect) {
      correctSound.currentTime = 0;
      correctSound.play();
      setSolvedGroups(prev => [...prev, group]);
      setBoardWords(prev => prev.filter(w => !group.words.includes(w)));
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
      setMistakes(m => m + 1);
    }

    setSelected([]);
  };

  const difficultyColors = {
  1: "bg-yellow-200",
  2: "bg-green-200",
  3: "bg-blue-200",
  4: "bg-purple-200"
};

  return (
    <div className="max-w-4xl mx-auto p-6">

      {!puzzle ? (
        <div>Loading...</div>
      ) : (
        <>
        <div className="flex justify-between">
             <h1 className="text-3xl font-bold mb-4">{puzzle.title}</h1>
          <button
            className="px-4 py-2  bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setBoardWords(prev => [...prev].sort(() => Math.random() - 0.5))}
          >
            🔀 Shuffle
          </button>
        </div>
       

          {/* solved groups */}
          <div className="space-y-3 mb-6">
            {solvedGroups.map(group => (
         <div
          key={group._id}
          className={`p-4 rounded-lg font-semibold ${difficultyColors[group.difficulty]}`}
        >
          {group.category}: {group.words.join(", ")}
        </div>

            ))}
          </div>

          <TileGrid
            words={boardWords}
            selected={selected}
            onToggle={toggleWord}
          />

          <div className="mt-4">Mistakes: {mistakes} / 4</div>

          {gameComplete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-3">Puzzle Complete!</h2>
                <p className="mb-4">Great job! You solved all categories.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
