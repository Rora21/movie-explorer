export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
  );
}
