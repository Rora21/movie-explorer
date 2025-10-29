import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorite_movies");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = {
          id: data.id,
          name: data.name,
          genres: data.genres,
          image: data.image?.medium || "",
          summary: data.summary,
          rating: data.rating?.average,
          premiered: data.premiered,
          officialSite: data.officialSite,
        };
        setMovie(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    localStorage.setItem("favorite_movies", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    if (favorites.find((m) => m.id === movie.id)) {
      setFavorites(favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading movie...</p>;
  if (!movie) return <p className="text-center mt-8">Movie not found </p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-gray-800 p-6 rounded shadow">
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-64 object-cover rounded"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{movie.name}</h1>
      <p className="text-gray-300 mt-1">Genres: {movie.genres.join(", ")}</p>
      {movie.rating && <p className="text-gray-300 mt-1">Rating: {movie.rating}</p>}
      {movie.premiered && <p className="text-gray-300 mt-1">Premiered: {movie.premiered}</p>}
      {movie.summary && (
        <div
          className="text-gray-200 mt-4"
          dangerouslySetInnerHTML={{ __html: movie.summary }}
        />
      )}
      {movie.officialSite && (
        <a
          href={movie.officialSite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 underline mt-2 block"
        >
          Official Site
        </a>
      )}
      <button
        onClick={toggleFavorite}
        className={`mt-4 px-4 py-2 rounded text-white ${
          favorites.find((m) => m.id === movie.id) ? "bg-red-500" : "bg-yellow-500"
        }`}
      >
        {favorites.find((m) => m.id === movie.id) ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <Link to="/" className="block mt-4 text-gray-300 underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default MovieDetails;
