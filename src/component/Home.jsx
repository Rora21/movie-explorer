import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

export default function Home({ movies = [], onFavoriteToggle = () => {}, favorites = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetched, setFetched] = useState([]);
  const list = movies.length ? movies : fetched;

  useEffect(() => {
    if (movies.length) return;
    let cancelled = false;
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const mapped = (data || []).map((d) => ({
          id: d.id,
          name: d.name,
          title: d.name,
          image: d.image,
        }));
        setFetched(mapped);
      })
      .catch(() => setFetched([]));
    return () => {
      cancelled = true;
    };
  }, [movies.length]);

  const filteredMovies = list.filter((movie) =>
    (movie.title || movie.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex flex-col items-center justify-center text-center bg-cover bg-center mb-10 rounded-b-3xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608889175123-36e9a90b1d1d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-b-3xl"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold mb-3">Explore Movies</h1>
          <p className="text-gray-300 text-lg mb-6">
            Find your next favorite movie and add it to your list.
          </p>
          <div className="flex justify-center gap-4">
            
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2 sm:mb-0">
            Browse the list and view details
          </h2>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMovies.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={favorites.some((f) => f.id === m.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
