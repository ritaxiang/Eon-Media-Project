import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSubmit = () => {
    onSearch(searchTerm);
  }

  return (
    <div>
        <input
            placeholder='Browse videos...'
            type='text'
            value={searchTerm}
            onChange={handleChange}
        />
        <button type='submit' onClick={handleSubmit}>
            Search!
        </button>
    </div>
  )
}

export default SearchBar