import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addFavorite, onFavoriteToggle, toggleFavorite, isFavorite }) => {
  const handler = addFavorite || onFavoriteToggle || toggleFavorite || (() => {});
  const imgSrc = movie?.image?.medium || movie?.image || "";
  const title = movie?.name || movie?.title || "";

  const cardStyle = {
    backgroundColor: "#1e1e1e",
    color: "#f5f5f5",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "16px",
    margin: "12px",
    maxWidth: "250px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  };

  const imgStyle = {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid #444",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "12px",
  };

  const buttonStyle = (isFav) => ({
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    color: "white",
    backgroundColor: isFav ? "#dc2626" : "#f59e0b",
  });

  const linkStyle = {
    color: "#fbbf24",
    textDecoration: "none",
    fontWeight: "500",
    marginLeft: "8px",
  };

  return (
    <div style={cardStyle}>
      {imgSrc && <img src={imgSrc} alt={title} style={imgStyle} />}
      <h3 style={titleStyle}>{title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={buttonStyle(isFavorite)} onClick={() => handler(movie)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <Link to={`/movie/${movie.id}`} style={linkStyle}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
