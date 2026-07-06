function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by Product ID or Name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;