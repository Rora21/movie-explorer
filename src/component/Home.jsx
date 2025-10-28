import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorite_movies");
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch movies from API
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((m) => ({
          id: m.id,
          name: m.name,
          genres: m.genres,
          image: m.image?.medium || "",
          summary: m.summary,
        }));
        setMovies(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Save favorites in localStorage
  useEffect(() => {
    localStorage.setItem("favorite_movies", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Get all genres for filter
  const categories = Array.from(new Set(movies.flatMap((m) => m.genres)));

  const filteredMovies = movies.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? m.genres.includes(category) : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p className="text-center mt-8">Loading movies...</p>;

  return (
    <div>
      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-2/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">All Genres</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-300">No movies found 😢</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((m) => m.id === movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
