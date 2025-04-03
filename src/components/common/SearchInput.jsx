import React from 'react';

const SearchInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="searchInput" className="block text-sm font-medium">{label}</label>
      <input
        type="text"
        id="searchInput"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
};

export default SearchInput;