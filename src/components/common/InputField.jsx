import React from 'react';

const InputField = ({
  type,
  name,
  id,
  label,
  placeholder,
  required = false,
  errorId,
  errorMessage,
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <label 
        htmlFor={id} 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {errorId && errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;