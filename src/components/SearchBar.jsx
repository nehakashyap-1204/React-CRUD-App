import React from 'react'

function SearchBar() {
  return (
    <>
      <div className="search-menu">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for a country..."
        />
      </div>
    </>
  );
}

export default SearchBar
