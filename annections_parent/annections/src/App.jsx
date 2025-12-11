// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PuzzlePage from "./pages/PuzzlePage.jsx"

export default function App() {
  return (
    <Routes>
      {/* Redirect root to a default puzzle */}
      <Route path="/" element={<Navigate to="/puzzle/animals" replace />} />

      {/* Puzzle route with dynamic ID */}
      <Route path="/puzzle/:id" element={<PuzzlePage />} />

      {/* page */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}
