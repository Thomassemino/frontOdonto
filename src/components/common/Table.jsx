import React from 'react';

const Table = ({ columns, children, mobileView = true, className = "" }) => {
  return (
    <div className={`${mobileView ? 'hidden md:block' : ''} overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800 ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;