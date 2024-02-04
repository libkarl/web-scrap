import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const cx = process.env.REACT_APP_CUSTOM_SEARCH_ENGINE_ID;
      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

      const response = await axios.get(apiUrl);
      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul className="search-results">
        {results.map((result) => (
          <li key={result.cacheId} className="result-item">
            <h3>{result.title}</h3>
            <p className="result-snippet">{result.snippet}</p>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
