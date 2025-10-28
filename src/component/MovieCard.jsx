import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addFavorite }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>
      <img src={movie.image?.medium} alt={movie.name} />
      <h3>{movie.name}</h3>
      <button onClick={() => addFavorite(movie)}>Add to Favorites</button>
      <Link to={`/movie/${movie.id}`} style={{ marginLeft: "1rem" }}>Details</Link>
    </div>
  );
};

export default MovieCard;
