import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./component/Home";
import MovieDetails from "./component/MovieDetails";
import Favorites from "./component/Favorites";
import MovieCard from "./component/MovieCard"
import Nav from "./component/Nav"

function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorite_movies");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorite_movies", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        alert("Removed from favorites");
        return prev.filter((m) => m.id !== movie.id);
      } else {
        alert("Added to favorites");
        return [...prev, movie];
      }
    });
  };

  const FavSet = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);

  return (
    <Router>
      <Nav/>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} onFavoriteToggle={toggleFavorite} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/MovieCard" element={<MovieCard movie={{}} addFavorite={() => {}} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
