export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <svg
          fill="none"
          height="20"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
        <input
          id="searchInput"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          type="text"
        />
      </div>
    </div>
  );
}
