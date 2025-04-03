import React from 'react';

const SelectField = ({
  name,
  id,
  label,
  options,
  required = false,
  className = "",
  value,
  onChange
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;