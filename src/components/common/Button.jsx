import React from 'react';

const variants = {
  primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
  danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
};

const Button = ({
  type = "button",
  id,
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  children
}) => {
  return (
    <button
      type={type}
      id={id}
      className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;