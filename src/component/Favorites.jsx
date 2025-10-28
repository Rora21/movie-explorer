import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorite_movies");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (movie) => {
    setFavorites(favorites.filter((m) => m.id !== movie.id));
  };

  useEffect(() => {
    localStorage.setItem("favorite_movies", JSON.stringify(favorites));
  }, [favorites]);

  if (favorites.length === 0)
    return <p className="text-center mt-8 text-gray-300">No favorite movies yet 😢</p>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={true}
        />
      ))}
    </div>
  );
};

export default Favorites;
