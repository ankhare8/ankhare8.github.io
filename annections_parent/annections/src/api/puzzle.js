const BASE = import.meta.env.VITE_BACKEND_URL;

export const fetchPuzzle = async (id) => {
  const res = await fetch(`${BASE}/api/puzzles/${id}`);
  return res.json();
};

export const fetchAllPuzzles = async () => {
  const res = await fetch(`${BASE}/api/puzzles`);
  return res.json();
};
