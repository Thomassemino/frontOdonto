import React from 'react';

const AuthCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-white">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default AuthCard;